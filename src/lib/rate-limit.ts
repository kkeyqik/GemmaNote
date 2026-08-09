import "server-only";

export interface RateLimitOptions {
  limit?: number;
  windowMs?: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  retryAfter: number;
}

const globalForRateLimit = globalThis as unknown as {
  rateLimitMap?: Map<string, number[]>;
};

const tracker = globalForRateLimit.rateLimitMap ?? new Map<string, number[]>();

if (process.env.NODE_ENV !== "production") {
  globalForRateLimit.rateLimitMap = tracker;
}

/**
 * Extracts a unique key for rate limiting from request headers.
 * Uses IP (x-forwarded-for, x-real-ip, cf-connecting-ip) or session (authorization, cookie).
 */
function getClientIdentifier(req: Request): string {
  const headers = req.headers;
  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const ip = xForwardedFor.split(",")[0].trim();
    if (ip) return `ip:${ip}`;
  }

  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) return `ip:${xRealIp.trim()}`;

  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return `ip:${cfIp.trim()}`;

  const authHeader = headers.get("authorization");
  if (authHeader) return `auth:${authHeader.trim()}`;

  const cookieHeader = headers.get("cookie");
  if (cookieHeader) return `cookie:${cookieHeader.trim()}`;

  return "ip:127.0.0.1";
}

/**
 * In-memory sliding-window rate limiter.
 * Allows max 60 requests per minute per IP / session by default.
 */
export function checkRateLimit(
  req: Request,
  options?: RateLimitOptions
): RateLimitResult {
  const limit = options?.limit ?? 60;
  const windowMs = options?.windowMs ?? 60 * 1000;
  const now = Date.now();
  const windowStart = now - windowMs;

  const key = getClientIdentifier(req);
  const timestamps = tracker.get(key) || [];

  // Filter out timestamps outside the current window
  const validTimestamps = timestamps.filter((ts) => ts > windowStart);

  // Periodic cleanup if map grows large
  if (tracker.size > 10000) {
    for (const [k, tsArray] of tracker.entries()) {
      if (tsArray.every((ts) => ts <= windowStart)) {
        tracker.delete(k);
      }
    }
  }

  if (validTimestamps.length < limit) {
    validTimestamps.push(now);
    tracker.set(key, validTimestamps);
    const remaining = limit - validTimestamps.length;
    return {
      success: true,
      remaining,
      retryAfter: 0,
    };
  } else {
    tracker.set(key, validTimestamps);
    const oldestTimestamp = validTimestamps[0];
    const retryAfterMs = oldestTimestamp + windowMs - now;
    const retryAfter = Math.max(1, Math.ceil(retryAfterMs / 1000));
    return {
      success: false,
      remaining: 0,
      retryAfter,
    };
  }
}
