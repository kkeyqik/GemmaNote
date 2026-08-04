import { errorResponse, requireAppUser, requireMinimumPlan } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireAppUser();
    requireMinimumPlan(user, "AGENCY");
    const voices = await prisma.voicePreset.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
    });
    return Response.json(voices);
  } catch (error) {
    return errorResponse(error, "Failed to load voice presets");
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAppUser();
    requireMinimumPlan(user, "AGENCY");
    const body: unknown = await request.json();
    const name = body && typeof body === "object" ? (body as { name?: unknown }).name : undefined;
    const instructions = body && typeof body === "object" ? (body as { instructions?: unknown }).instructions : undefined;
    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 50) {
      return Response.json({ error: "Voice names must be between 2 and 50 characters" }, { status: 400 });
    }
    if (typeof instructions !== "string" || instructions.trim().length < 10 || instructions.trim().length > 4_000) {
      return Response.json({ error: "Voice instructions must be between 10 and 4,000 characters" }, { status: 400 });
    }

    const preset = await prisma.voicePreset.upsert({
      where: { userId_name: { userId: user.id, name: name.trim() } },
      create: { userId: user.id, name: name.trim(), instructions: instructions.trim() },
      update: { instructions: instructions.trim() },
    });
    return Response.json(preset, { status: 201 });
  } catch (error) {
    return errorResponse(error, "Failed to save voice preset");
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireAppUser();
    requireMinimumPlan(user, "AGENCY");
    const body: unknown = await request.json();
    const id = body && typeof body === "object" ? (body as { id?: unknown }).id : undefined;
    if (typeof id !== "string" || !id) return Response.json({ error: "Voice preset id is required" }, { status: 400 });
    const result = await prisma.voicePreset.deleteMany({ where: { id, userId: user.id } });
    if (!result.count) return Response.json({ error: "Voice preset not found" }, { status: 404 });
    return new Response(null, { status: 204 });
  } catch (error) {
    return errorResponse(error, "Failed to delete voice preset");
  }
}
