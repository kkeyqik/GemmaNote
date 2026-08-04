import { errorResponse, getPlan, getPlanFeatures, getUsage, requireAppUser } from "@/lib/app-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireAppUser();
    const usage = await getUsage(user);

    return Response.json({
      email: user.email,
      plan: getPlan(user.plan),
      usage: {
        ...usage,
        periodStart: usage.periodStart.toISOString(),
      },
      features: getPlanFeatures(user.plan),
    });
  } catch (error) {
    return errorResponse(error, "Failed to load account");
  }
}
