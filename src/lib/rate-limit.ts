import "server-only";

import { createHash } from "node:crypto";

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
if (process.env.NODE_ENV !== "production") globalForRateLimit.rateLimitMap = tracker;

function getClientIdentifier(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const real = req.headers.get("x-real-ip")?.trim();
  const cf = req.headers.get("cf-connecting-ip")?.trim();
  const raw = forwarded || real || cf || "unknown-client";
  return createHash("sha256").update(raw).digest("hex").slice(0, 32);
}

function localRateLimit(req: Request, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;
  const key = getClientIdentifier(req);
  const valid = (tracker.get(key) ?? []).filter((ts) => ts > windowStart);
  if (valid.length >= limit) {
    tracker.set(key, valid);
    return { success: false, remaining: 0, retryAfter: Math.max(1, Math.ceil((valid[0] + windowMs - now) / 1000)) };
  }
  valid.push(now);
  tracker.set(key, valid);
  if (tracker.size > 10000) {
    for (const [candidate, timestamps] of tracker) {
      if (timestamps.every((ts) => ts <= windowStart)) tracker.delete(candidate);
    }
  }
  return { success: true, remaining: limit - valid.length, retryAfter: 0 };
}

/**
 * Production note: configure a shared limiter at the edge/WAF or Redis layer.
 * This bounded fallback is intentionally only a development safety net; it is
 * not a substitute for Upstash/Vercel KV/Cloudflare rate limiting.
 */
export function checkRateLimit(req: Request, options?: RateLimitOptions): RateLimitResult {
  if (process.env.NODE_ENV === "production" && process.env.RATE_LIMIT_BACKEND !== "shared") {
    throw new Error("RATE_LIMIT_BACKEND=shared is required in production; configure Redis/KV or an edge limiter.");
  }
  const limit = Math.max(1, options?.limit ?? 60);
  const windowMs = Math.max(1000, options?.windowMs ?? 60_000);
  return localRateLimit(req, limit, windowMs);
}
