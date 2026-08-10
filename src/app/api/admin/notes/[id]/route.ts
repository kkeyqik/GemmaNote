import { errorResponse, requireAdminUser } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Context) {
  try {
    await requireAdminUser();
    const { id } = await params;

    const existing = await prisma.document.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    await prisma.document.delete({ where: { id } });
    return Response.json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    return errorResponse(error, "Failed to delete note");
  }
}
