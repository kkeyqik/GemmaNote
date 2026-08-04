import { errorResponse, requireAppUser, requireMinimumPlan } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";
import { getPersonalWorkspace } from "@/lib/workspaces";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireAppUser();
    const personal = await getPersonalWorkspace(user);
    const workspaces = await prisma.workspace.findMany({
      where: { OR: [{ ownerId: user.id }, { members: { some: { userId: user.id } } }] },
      orderBy: { createdAt: "asc" },
    });
    return Response.json(workspaces.map((workspace) => ({ ...workspace, isPersonal: workspace.id === personal.id })));
  } catch (error) {
    return errorResponse(error, "Failed to load workspaces");
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAppUser();
    requireMinimumPlan(user, "AGENCY");
    const body: unknown = await request.json();
    const name = body && typeof body === "object" ? (body as { name?: unknown }).name : undefined;
    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 80) {
      return Response.json({ error: "Workspace names must be between 2 and 80 characters" }, { status: 400 });
    }

    const workspace = await prisma.workspace.create({
      data: {
        name: name.trim(),
        ownerId: user.id,
        members: { create: { userId: user.id, role: "OWNER" } },
      },
    });
    return Response.json(workspace, { status: 201 });
  } catch (error) {
    return errorResponse(error, "Failed to create workspace");
  }
}
