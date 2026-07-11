import { NextResponse } from "next/server";

// Simple in-memory sliding window rate limiter
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // max 5 submissions per 10 minutes

function getRateLimitStatus(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
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
function sanitizeInput(text: any): string {
  if (typeof text !== "string") return "";
  const trimmed = text.trim();
  if (trimmed.startsWith("=") || trimmed.startsWith("+") || trimmed.startsWith("-") || trimmed.startsWith("@")) {
    return `'${trimmed}`; // Prepend single quote to tell Google Sheets to treat it as plain text
  }
  return trimmed;
}

export async function POST(request: Request) {
  try {
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

    const body = await request.json();
    const { name, email, phone, project, message, website } = body;

    // 2. Honeypot check (hidden "website" field filled by spam bots)
    if (website) {
      console.warn(`[Spam Blocked] Honeypot triggered by IP: ${ip}. Field filled: "${website}"`);
      // Return simulated success response so the bot thinks it succeeded, but save no data
      return NextResponse.json({
        status: "success",
        message: "Your inquiry has been received."
      });
    }

    // 3. Validation of required inputs
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields." },
        { status: 400 }
      );
    }

    // 4. Sanitize inputs to prevent CSV/Formula injection
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanPhone = sanitizeInput(phone);
    const cleanProject = sanitizeInput(project || "General Inquiry");
    const cleanMessage = sanitizeInput(message);

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    // If GOOGLE_SCRIPT_URL is not set, log and mock success in development
    if (!scriptUrl) {
      console.warn("GOOGLE_SCRIPT_URL environment variable is not defined!");
      console.info("Simulated sanitized submission details:", {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        project: cleanProject,
        message: cleanMessage,
        timestamp: new Date().toISOString()
      });

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

    try {
      const result = JSON.parse(responseText);
      if (result.status === "error") {
        throw new Error(result.message || "Failed to save inquiry to Google Sheets.");
      }
      return NextResponse.json({
        status: "success",
        message: "Your inquiry has been received."
      });
    } catch (e) {
      console.error("Failed to parse Apps Script response as JSON. Raw response from Google:", responseText);
      throw new Error("Received an unexpected HTML response from Google Apps Script. Please check the server logs for details.");
    }

  } catch (error: any) {
    console.error("Error in website inquiry backend handler:", error);
    return NextResponse.json(
      { 
        status: "error", 
        message: error.message || "There was a problem processing your request. Please try again." 
      },
      { status: 500 }
    );
  }
}
