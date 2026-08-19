import { consumeGeneration, errorResponse, requireAppUser } from "@/lib/app-auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { assertSameOrigin, readJson } from "@/lib/request-security";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  assertSameOrigin(request);
  const rateLimit = checkRateLimit(request);
  if (!rateLimit.success) {
    return Response.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    const user = await requireAppUser();
    const body = await readJson<unknown>(request);
    const idempotencyKey = request.headers.get("idempotency-key") ?? (body && typeof body === "object" && !Array.isArray(body) && typeof (body as { idempotencyKey?: unknown }).idempotencyKey === "string" ? (body as { idempotencyKey: string }).idempotencyKey : undefined);
    if (!idempotencyKey || !/^[A-Za-z0-9._:-]{8,128}$/.test(idempotencyKey)) {
      return Response.json({ error: "A valid idempotency key is required" }, { status: 400 });
    }
    const usage = await consumeGeneration(user, idempotencyKey);
    return Response.json({
      usage: { ...usage, periodStart: usage.periodStart.toISOString() },
    });
  } catch (error) {
    return errorResponse(error, "Failed to record generation usage");
  }
}
