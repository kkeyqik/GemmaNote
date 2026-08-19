import "server-only";

import { prisma } from "@/lib/prisma";

export type AuditAction =
  | "ADMIN_USER_UPDATED"
  | "ADMIN_SUPPORT_UPDATED"
  | "ADMIN_DOCUMENT_DELETED"
  | "DOCUMENT_UPDATED"
  | "DOCUMENT_DELETED";

function hashIp(value: string | null): string | null {
  if (!value) return null;
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `fnv1a:${(hash >>> 0).toString(16)}`;
}

export async function writeAuditEvent(input: {
  actorUserId: string;
  action: AuditAction;
  targetType: string;
  targetId?: string | null;
  request?: Request;
  metadata?: Record<string, unknown>;
}) {
  const ip = input.request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? input.request?.headers.get("x-real-ip");

  await prisma.auditEvent.create({
    data: {
      actorUserId: input.actorUserId,
      action: input.action,
      targetType: input.targetType,
      targetId: input.targetId ?? null,
      sourceIpHash: hashIp(ip ?? null),
      userAgent: input.request?.headers.get("user-agent")?.slice(0, 512) ?? null,
      metadata: input.metadata ? JSON.stringify(input.metadata).slice(0, 10000) : null,
    },
  });
}
