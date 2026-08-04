import { getAdminAccess } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const access = await getAdminAccess();
  if (access === "authorized") return null;
  return Response.json({ error: access === "unauthenticated" ? "Authentication required" : "Administrator access required" }, { status: access === "unauthenticated" ? 401 : 403 });
}

export async function GET() {
  const authorizationError = await requireAdmin();
  if (authorizationError) return authorizationError;

  try {
    const requests = await prisma.supportRequest.findMany({
      include: { user: { select: { email: true } } },
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    });
    return Response.json(requests.map((request) => ({
      id: request.id,
      email: request.user.email,
      subject: request.subject,
      message: request.message,
      status: request.status,
      createdAt: request.createdAt,
    })));
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to load support requests" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const authorizationError = await requireAdmin();
  if (authorizationError) return authorizationError;

  try {
    const body: unknown = await request.json();
    const id = body && typeof body === "object" ? (body as { id?: unknown }).id : undefined;
    const status = body && typeof body === "object" ? (body as { status?: unknown }).status : undefined;
    if (typeof id !== "string" || !id) return Response.json({ error: "Support request id is required" }, { status: 400 });
    if (status !== "OPEN" && status !== "IN_PROGRESS" && status !== "CLOSED") {
      return Response.json({ error: "Invalid support status" }, { status: 400 });
    }

    const result = await prisma.supportRequest.updateMany({ where: { id }, data: { status } });
    if (!result.count) return Response.json({ error: "Support request not found" }, { status: 404 });
    return Response.json({ id, status });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update support request" }, { status: 500 });
  }
}
