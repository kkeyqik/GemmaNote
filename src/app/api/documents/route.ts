import { ApiError, errorResponse, hasMinimumPlan, requireAppUser } from "@/lib/app-auth";
import { documentDto, parseDocumentInput, type DocumentInput } from "@/lib/documents";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { getPersonalWorkspace, requireWorkspaceAccess } from "@/lib/workspaces";
import { assertSameOrigin, readJson } from "@/lib/request-security";

export const dynamic = "force-dynamic";

async function documentWorkspace(userId: string, plan: string, requestedWorkspaceId: string | null) {
  if (!requestedWorkspaceId) return null;
  const workspace = await requireWorkspaceAccess(userId, requestedWorkspaceId);

  if (workspace.ownerId !== userId && !hasMinimumPlan(plan, "AGENCY")) {
    throw new ApiError(403, "Agency plan required for shared workspaces");
  }

  return workspace.id;
}

export async function GET(request: Request) {
  const rateLimit = checkRateLimit(request);
  if (!rateLimit.success) {
    return Response.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    const user = await requireAppUser();
    const workspaceId = new URL(request.url).searchParams.get("workspaceId");
    const selectedWorkspaceId = workspaceId
      ? await documentWorkspace(user.id, user.plan, workspaceId)
      : (await getPersonalWorkspace(user)).id;

    const documents = await prisma.document.findMany({
      where: { workspaceId: selectedWorkspaceId },
      orderBy: { updatedAt: "desc" },
    });
    return Response.json(documents.map(documentDto));
  } catch (error) {
    return errorResponse(error, "Failed to load documents");
  }
}

export async function POST(request: Request) {
  assertSameOrigin(request);
  const rateLimit = checkRateLimit(request);
  if (!rateLimit.success) {
    return Response.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    const user = await requireAppUser();
    const body: unknown = await readJson<unknown>(request);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const input = parseDocumentInput(body as DocumentInput);
    const workspaceId = input.workspaceId
      ? await documentWorkspace(user.id, user.plan, input.workspaceId)
      : (await getPersonalWorkspace(user)).id;
    const data = { ...input, externalId: input.externalId ?? undefined, workspaceId, userId: user.id };

    const document = input.externalId
      ? await prisma.document.upsert({
          where: { userId_externalId: { userId: user.id, externalId: input.externalId } },
          create: data,
          update: { ...data, externalId: input.externalId },
        })
      : await prisma.document.create({ data });

    return Response.json(documentDto(document), { status: 201 });
  } catch (error) {
    return errorResponse(error, "Failed to save document");
  }
}
