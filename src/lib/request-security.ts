import { ApiError } from "@/lib/app-auth";

const MAX_JSON_BYTES = 3_000_000;

function allowedOrigins(): string[] {
  return [
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.APP_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ].filter((value): value is string => Boolean(value)).map((value) => value.replace(/\/$/, ""));
}

export function assertSameOrigin(request: Request): void {
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    throw new ApiError(415, "Requests must use application/json");
  }

  const origin = request.headers.get("origin");
  if (!origin) {
    const referer = request.headers.get("referer");
    if (!referer) throw new ApiError(403, "Request origin is required");
    try {
      if (!allowedOrigins().includes(new URL(referer).origin)) {
        throw new ApiError(403, "Cross-origin request blocked");
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(403, "Invalid request origin");
    }
    return;
  }

  let normalized: string;
  try {
    normalized = new URL(origin).origin;
  } catch {
    throw new ApiError(403, "Invalid request origin");
  }

  if (!allowedOrigins().includes(normalized)) {
    throw new ApiError(403, "Cross-origin request blocked");
  }
}

export async function readJson<T>(request: Request): Promise<T> {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_JSON_BYTES) {
    throw new ApiError(413, "Request body is too large");
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_JSON_BYTES) {
    throw new ApiError(413, "Request body is too large");
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiError(400, "Invalid JSON body");
  }
}
