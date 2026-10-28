import { NextResponse } from "next/server";

// Simple in-memory sliding window rate limiter
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // max 5 submissions per 10 minutes
const MAX_TRACKED_IPS = 1000; // sweep expired entries beyond this to keep memory bounded

const MAX_BODY_BYTES = 20 * 1024;
const MAX_LENGTHS = { name: 100, email: 254, phone: 20, project: 100, message: 2000 };
const EMAIL_PATTERN = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;
const PHONE_PATTERN = /^[+0-9 ()\-.]{7,20}$/;

const GENERIC_ERROR_MESSAGE = "There was a problem processing your request. Please try again or call +91 98423 23071.";

function evictExpiredEntries(now: number) {
  if (ipRequestCounts.size <= MAX_TRACKED_IPS) return;
  for (const [key, record] of ipRequestCounts) {
    if (now > record.resetTime) ipRequestCounts.delete(key);
  }
}

function getRateLimitStatus(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  evictExpiredEntries(now);
  const record = ipRequestCounts.get(ip);

  if (!record) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (now > record.resetTime) {
    // Reset the window
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  record.count += 1;
  return { allowed: true };
}

// Prevents Google Sheets CSV/Formula injection by escaping leading '=', '+', '-', '@'
function sanitizeInput(text: string): string {
  if (text.startsWith("=") || text.startsWith("+") || text.startsWith("-") || text.startsWith("@")) {
    return `'${text}`; // Prepend single quote to tell Google Sheets to treat it as plain text
  }
  return text;
}

function badRequest(message: string) {
  return NextResponse.json({ status: "error", message }, { status: 400 });
}

// Returns the trimmed string, "" if absent, or null if the value is not a string
function readField(value: unknown): string | null {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") return null;
  return value.trim();
}

export async function POST(request: Request) {
  try {
    // 0. Only accept JSON bodies of a reasonable size (cross-site "simple" form posts are rejected)
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().startsWith("application/json")) {
      return NextResponse.json({ status: "error", message: "Unsupported content type." }, { status: 415 });
    }
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ status: "error", message: "Request is too large." }, { status: 413 });
    }

    // 1. IP-based Rate Limiter check
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    
    const rateLimitCheck = getRateLimitStatus(ip);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { 
          status: "error", 
          message: `Too many requests. Please wait ${rateLimitCheck.retryAfterSeconds} seconds before trying again.` 
        },
        { status: 429 }
      );
    }

    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return NextResponse.json({ status: "error", message: "Request is too large." }, { status: 413 });
    }

    let body: Record<string, unknown>;
    try {
      const parsed: unknown = JSON.parse(rawBody);
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        return badRequest("Invalid request body.");
      }
      body = parsed as Record<string, unknown>;
    } catch {
      return badRequest("Invalid request body.");
    }

    // 2. Honeypot check (hidden "website" field filled by spam bots)
    if (body.website) {
      console.warn(`[Spam Blocked] Honeypot triggered by IP: ${ip} (hidden field had ${String(body.website).length} chars)`);
      // Return simulated success response so the bot thinks it succeeded, but save no data
      return NextResponse.json({
        status: "success",
        message: "Your inquiry has been received."
      });
    }

    // 3. Validation of inputs (types, required fields, formats, lengths)
    const name = readField(body.name);
    const email = readField(body.email);
    const phone = readField(body.phone);
    const project = readField(body.project);
    const message = readField(body.message);

    if (name === null || email === null || phone === null || project === null || message === null) {
      return badRequest("Invalid field values.");
    }
    if (!name || !email || !phone || !message) {
      return badRequest("Missing required fields.");
    }
    if (
      name.length > MAX_LENGTHS.name ||
      email.length > MAX_LENGTHS.email ||
      phone.length > MAX_LENGTHS.phone ||
      project.length > MAX_LENGTHS.project ||
      message.length > MAX_LENGTHS.message
    ) {
      return badRequest(`Please keep your name under ${MAX_LENGTHS.name} and your message under ${MAX_LENGTHS.message} characters.`);
    }
    if (!EMAIL_PATTERN.test(email)) {
      return badRequest("Please enter a valid email address.");
    }
    if (!PHONE_PATTERN.test(phone) || phone.replace(/\D/g, "").length < 7) {
      return badRequest("Please enter a valid phone number.");
    }

    // 4. Sanitize inputs to prevent CSV/Formula injection
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanPhone = sanitizeInput(phone);
    const cleanProject = sanitizeInput(project || "General Inquiry");
    const cleanMessage = sanitizeInput(message);

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      // Never pretend to accept a lead in production when it cannot be stored
      if (process.env.NODE_ENV === "production") {
        console.error("[inquiry] GOOGLE_SCRIPT_URL is not set in production; inquiry was NOT stored.");
        return NextResponse.json(
          { status: "error", message: GENERIC_ERROR_MESSAGE },
          { status: 503 }
        );
      }

      // Development only: mock success without storing or logging personal data
      console.warn("[inquiry] GOOGLE_SCRIPT_URL is not set; development mock, nothing stored.");
      return NextResponse.json({
        status: "success",
        message: "Inquiry simulated successfully (Development Mode - GOOGLE_SCRIPT_URL is not set)."
      });
    }

    // Call the Google Apps Script Web App
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        project: cleanProject,
        message: cleanMessage,
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script API responded with status: ${response.status}`);
    }

    const responseText = await response.text();

    let result: { status?: string; message?: string };
    try {
      result = JSON.parse(responseText);
    } catch {
      console.error(`[inquiry] Apps Script returned a non-JSON response (first 200 chars): ${responseText.slice(0, 200)}`);
      throw new Error("Unexpected non-JSON response from Google Apps Script.");
    }
    if (result.status === "error") {
      throw new Error(`Apps Script reported an error: ${result.message || "unknown"}`);
    }
    return NextResponse.json({
      status: "success",
      message: "Your inquiry has been received."
    });

  } catch (error: unknown) {
    // Details stay in server logs; the client only receives a generic message
    console.error("[inquiry] Error in website inquiry backend handler:", error);
    return NextResponse.json(
      { status: "error", message: GENERIC_ERROR_MESSAGE },
      { status: 500 }
    );
  }
}
