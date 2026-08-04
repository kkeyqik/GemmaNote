import { errorResponse, requireAppUser, requireMinimumPlan } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  try {
    const user = await requireAppUser();
    requireMinimumPlan(user, "AGENCY");
    const { id } = await params;
    const workspace = await prisma.workspace.findFirst({
      where: { id, ownerId: user.id },
      include: { members: { include: { user: { select: { id: true, email: true } } }, orderBy: { createdAt: "asc" } } },
    });
    if (!workspace) return Response.json({ error: "Workspace not found" }, { status: 404 });
    return Response.json(workspace.members.map((member) => ({ id: member.user.id, email: member.user.email, role: member.role })));
  } catch (error) {
    return errorResponse(error, "Failed to load workspace members");
  }
}

export async function POST(request: Request, { params }: Context) {
  try {
    const user = await requireAppUser();
    requireMinimumPlan(user, "AGENCY");
    const { id } = await params;
    const body: unknown = await request.json();
    const email = body && typeof body === "object" ? (body as { email?: unknown }).email : undefined;
    if (typeof email !== "string" || !email.includes("@") || email.length > 320) {
      return Response.json({ error: "A valid member email is required" }, { status: 400 });
    }

    const workspace = await prisma.workspace.findFirst({ where: { id, ownerId: user.id } });
    if (!workspace) return Response.json({ error: "Workspace not found" }, { status: 404 });
    const member = await prisma.user.findFirst({ where: { email: email.trim() } });
    if (!member) {
      return Response.json({ error: "That person must sign in to GemmaNote before they can be added" }, { status: 404 });
    }

    const membership = await prisma.workspaceMember.upsert({
      where: { workspaceId_userId: { workspaceId: workspace.id, userId: member.id } },
      create: { workspaceId: workspace.id, userId: member.id, role: "MEMBER" },
      update: { role: "MEMBER" },
      include: { user: { select: { id: true, email: true } } },
    });
    return Response.json({ id: membership.user.id, email: membership.user.email, role: membership.role }, { status: 201 });
  } catch (error) {
    return errorResponse(error, "Failed to add workspace member");
  }
}
