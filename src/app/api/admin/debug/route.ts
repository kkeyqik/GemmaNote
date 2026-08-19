import { requireAdminUser, errorResponse } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * Minimal authenticated health check.
 * Detailed diagnostics and all repair operations belong in a private
 * operational tool, not a publicly reachable production API route.
 */
export async function GET() {
  try {
    await requireAdminUser();

    const startedAt = Date.now();
    await prisma.$queryRaw`SELECT 1`;

    return Response.json({
      status: "ok",
      checks: {
        database: "ok",
      },
      latencyMs: Date.now() - startedAt,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return errorResponse(error, "Health check failed");
  }
}
