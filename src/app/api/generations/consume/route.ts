import { consumeGeneration, errorResponse, requireAppUser } from "@/lib/app-auth";

export const dynamic = "force-dynamic";

export async function POST() {
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
