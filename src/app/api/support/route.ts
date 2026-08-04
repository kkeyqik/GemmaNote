import { errorResponse, requireAppUser } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireAppUser();
    const requests = await prisma.supportRequest.findMany({
      where: { userId: user.id },
      select: { id: true, subject: true, status: true, createdAt: true, updatedAt: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return Response.json(requests);
  } catch (error) {
    return errorResponse(error, "Failed to load support requests");
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAppUser();
    const body: unknown = await request.json();
    const subject = body && typeof body === "object" ? (body as { subject?: unknown }).subject : undefined;
    const message = body && typeof body === "object" ? (body as { message?: unknown }).message : undefined;
    if (typeof subject !== "string" || subject.trim().length < 3 || subject.trim().length > 120) {
      return Response.json({ error: "Subject must be between 3 and 120 characters" }, { status: 400 });
    }
    if (typeof message !== "string" || message.trim().length < 10 || message.trim().length > 5_000) {
      return Response.json({ error: "Message must be between 10 and 5,000 characters" }, { status: 400 });
    }

    const supportRequest = await prisma.supportRequest.create({
      data: { userId: user.id, subject: subject.trim(), message: message.trim() },
      select: { id: true, subject: true, status: true, createdAt: true },
    });
    return Response.json(supportRequest, { status: 201 });
  } catch (error) {
    return errorResponse(error, "Failed to create support request");
  }
}
