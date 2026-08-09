import { consumeGeneration, errorResponse, requireAppUser } from "@/lib/app-auth";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request);
  if (!rateLimit.success) {
    return Response.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    const user = await requireAppUser();
    const usage = await consumeGeneration(user);
    return Response.json({
      usage: { ...usage, periodStart: usage.periodStart.toISOString() },
    });
  } catch (error) {
    return errorResponse(error, "Failed to record generation usage");
  }
}
