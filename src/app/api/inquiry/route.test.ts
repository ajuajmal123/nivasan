import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const SCRIPT_URL = "https://script.example.test/exec";

const validInquiry = {
  name: "Asha Kumar",
  email: "asha@example.com",
  phone: "+91 98423 23071",
  project: "Nivasan Vakulam",
  message: "Please share pricing.",
};

let ipCounter = 0;
function nextIp() {
  ipCounter += 1;
  return `203.0.113.${ipCounter}`;
}

function makeRequest(
  body: unknown,
  { ip = nextIp(), contentType = "application/json", raw }: { ip?: string; contentType?: string; raw?: string } = {}
) {
  return new Request("http://localhost/api/inquiry", {
    method: "POST",
    headers: { "content-type": contentType, "x-forwarded-for": ip },
    body: raw ?? JSON.stringify(body),
  });
}

function mockUpstream(response: Response) {
  const fetchMock = vi.fn().mockResolvedValue(response);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });
}

// Fresh module per test so the in-memory rate limiter starts empty
async function loadPost() {
  vi.resetModules();
  return (await import("./route")).POST;
}

beforeEach(() => {
  vi.stubEnv("GOOGLE_SCRIPT_URL", SCRIPT_URL);
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/inquiry", () => {
  it("forwards a valid inquiry to the Apps Script and returns success", async () => {
    const fetchMock = mockUpstream(jsonResponse({ status: "success" }));
    const POST = await loadPost();

    const res = await POST(makeRequest(validInquiry));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "success", message: "Your inquiry has been received." });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(SCRIPT_URL);
    expect(JSON.parse(init.body)).toEqual({
      name: "Asha Kumar",
      email: "asha@example.com",
      phone: "'+91 98423 23071", // formula-escaped for Google Sheets
      project: "Nivasan Vakulam",
      message: "Please share pricing.",
    });
  });

  it("escapes spreadsheet formulas and defaults the project", async () => {
    const fetchMock = mockUpstream(jsonResponse({ status: "success" }));
    const POST = await loadPost();

    await POST(makeRequest({ ...validInquiry, name: '=HYPERLINK("https://evil")', project: undefined }));

    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent.name).toBe(`'=HYPERLINK("https://evil")`);
    expect(sent.project).toBe("General Inquiry");
  });

  it("rejects non-JSON content types", async () => {
    const fetchMock = mockUpstream(jsonResponse({ status: "success" }));
    const POST = await loadPost();

    const res = await POST(makeRequest(validInquiry, { contentType: "text/plain" }));

    expect(res.status).toBe(415);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects oversized bodies", async () => {
    const fetchMock = mockUpstream(jsonResponse({ status: "success" }));
    const POST = await loadPost();

    const res = await POST(makeRequest({ ...validInquiry, message: "x".repeat(30 * 1024) }));

    expect(res.status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ["malformed JSON", { raw: "{not json" }, "Invalid request body."],
    ["a JSON array", { raw: "[1,2]" }, "Invalid request body."],
  ])("rejects %s", async (_label, options, message) => {
    mockUpstream(jsonResponse({ status: "success" }));
    const POST = await loadPost();

    const res = await POST(makeRequest(null, options));

    expect(res.status).toBe(400);
    expect((await res.json()).message).toBe(message);
  });

  it.each([
    ["a non-string field", { name: 123 }, "Invalid field values."],
    ["a missing required field", { message: undefined }, "Missing required fields."],
    ["a blank required field", { name: "   " }, "Missing required fields."],
    ["an invalid email", { email: "not-an-email" }, "Please enter a valid email address."],
    ["an invalid phone", { phone: "=1+2" }, "Please enter a valid phone number."],
    ["a phone with too few digits", { phone: "+-()-" }, "Please enter a valid phone number."],
    ["an over-long message", { message: "x".repeat(2001) }, "Please keep your name under 100 and your message under 2000 characters."],
    ["an over-long name", { name: "x".repeat(101) }, "Please keep your name under 100 and your message under 2000 characters."],
  ])("rejects %s", async (_label, override, message) => {
    const fetchMock = mockUpstream(jsonResponse({ status: "success" }));
    const POST = await loadPost();

    const res = await POST(makeRequest({ ...validInquiry, ...override }));

    expect(res.status).toBe(400);
    expect((await res.json()).message).toBe(message);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("silently accepts but drops honeypot submissions", async () => {
    const fetchMock = mockUpstream(jsonResponse({ status: "success" }));
    const POST = await loadPost();

    const res = await POST(makeRequest({ ...validInquiry, website: "http://spam.example" }));

    expect(res.status).toBe(200);
    expect((await res.json()).status).toBe("success");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("allows 5 requests per IP per window, then returns 429", async () => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => jsonResponse({ status: "success" })));
    const POST = await loadPost();
    const ip = nextIp();

    for (let i = 0; i < 5; i++) {
      expect((await POST(makeRequest(validInquiry, { ip }))).status).toBe(200);
    }
    const limited = await POST(makeRequest(validInquiry, { ip }));
    expect(limited.status).toBe(429);

    // Other clients are unaffected
    expect((await POST(makeRequest(validInquiry))).status).toBe(200);
  });

  it.each([
    ["the Apps Script reports an error", jsonResponse({ status: "error", message: "internal secret detail" })],
    ["the Apps Script returns HTML", new Response("<html>Error</html>", { status: 200 })],
    ["the Apps Script returns a non-2xx status", new Response("nope", { status: 502 })],
  ])("returns a generic 500 when %s", async (_label, upstream) => {
    mockUpstream(upstream);
    const POST = await loadPost();

    const res = await POST(makeRequest(validInquiry));
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body.status).toBe("error");
    expect(body.message).not.toMatch(/secret|Apps Script|502|HTML/i);
  });

  it("refuses to fake success in production when GOOGLE_SCRIPT_URL is missing", async () => {
    vi.stubEnv("GOOGLE_SCRIPT_URL", "");
    vi.stubEnv("NODE_ENV", "production");
    const fetchMock = mockUpstream(jsonResponse({ status: "success" }));
    const POST = await loadPost();

    const res = await POST(makeRequest(validInquiry));

    expect(res.status).toBe(503);
    expect((await res.json()).status).toBe("error");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("mocks success in development when GOOGLE_SCRIPT_URL is missing, without logging personal data", async () => {
    vi.stubEnv("GOOGLE_SCRIPT_URL", "");
    vi.stubEnv("NODE_ENV", "development");
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const fetchMock = mockUpstream(jsonResponse({ status: "success" }));
    const POST = await loadPost();

    const res = await POST(makeRequest(validInquiry));

    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
    const logged = JSON.stringify([...infoSpy.mock.calls, ...vi.mocked(console.warn).mock.calls]);
    expect(logged).not.toContain(validInquiry.email);
    expect(logged).not.toContain("98423");
  });
});
