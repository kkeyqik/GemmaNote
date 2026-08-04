import { errorResponse, requireAppUser, requireMinimumPlan } from "@/lib/app-auth";
import { documentDto, parseDocumentInput, type DocumentInput } from "@/lib/documents";
import { prisma } from "@/lib/prisma";
import { requireWorkspaceAccess } from "@/lib/workspaces";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  try {
    const user = await requireAppUser();
    requireMinimumPlan(user, "PRO");
    const { id } = await params;
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    // A document's workspace is an authorization boundary. Moving it through
    // this endpoint would require verifying both the source and destination;
    // use a dedicated, explicitly authorized move flow if that is ever needed.
    if ("workspaceId" in body) {
      return Response.json({ error: "Changing a document workspace is not supported" }, { status: 400 });
    }

    const existing = await prisma.document.findUnique({ where: { id } });
    if (!existing) return Response.json({ error: "Document not found" }, { status: 404 });
    if (!existing.workspaceId) return Response.json({ error: "Document is not synced" }, { status: 404 });
    await requireWorkspaceAccess(user.id, existing.workspaceId);

    const input = parseDocumentInput({ ...existing, ...(body as DocumentInput), workspaceId: existing.workspaceId });
    const document = await prisma.document.update({
      where: { id },
      data: { ...input, externalId: input.externalId ?? undefined },
    });
    return Response.json(documentDto(document));
  } catch (error) {
    return errorResponse(error, "Failed to update document");
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  try {
    const user = await requireAppUser();
    requireMinimumPlan(user, "PRO");
    const { id } = await params;
    const existing = await prisma.document.findUnique({ where: { id } });
    if (!existing?.workspaceId) return Response.json({ error: "Document not found" }, { status: 404 });
    await requireWorkspaceAccess(user.id, existing.workspaceId);
    await prisma.document.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    return errorResponse(error, "Failed to delete document");
  }
}
