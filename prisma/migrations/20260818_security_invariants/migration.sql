-- Security hardening migration.
-- Validate existing data before enabling the commented ownership/check constraints.

-- SELECT id FROM "Document" WHERE "workspaceId" IS NULL OR "userId" IS NULL;
-- SELECT DISTINCT role FROM "User";
-- SELECT DISTINCT plan FROM "User";
-- SELECT DISTINCT role FROM "WorkspaceMember";
-- SELECT DISTINCT status FROM "SupportRequest";

CREATE TABLE IF NOT EXISTS "GenerationIdempotency" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "idempotencyKey" TEXT NOT NULL,
  "usageRecordId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GenerationIdempotency_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "GenerationIdempotency_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "GenerationIdempotency_usageRecordId_fkey" FOREIGN KEY ("usageRecordId") REFERENCES "UsageRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "GenerationIdempotency_userId_idempotencyKey_key" ON "GenerationIdempotency"("userId", "idempotencyKey");
CREATE INDEX IF NOT EXISTS "GenerationIdempotency_createdAt_idx" ON "GenerationIdempotency"("createdAt");

CREATE TABLE IF NOT EXISTS "AuditEvent" (
  "id" TEXT NOT NULL,
  "actorUserId" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "targetType" TEXT NOT NULL,
  "targetId" TEXT,
  "sourceIpHash" TEXT,
  "userAgent" TEXT,
  "metadata" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditEvent_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "AuditEvent_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "AuditEvent_actorUserId_createdAt_idx" ON "AuditEvent"("actorUserId", "createdAt");
CREATE INDEX IF NOT EXISTS "AuditEvent_targetType_targetId_createdAt_idx" ON "AuditEvent"("targetType", "targetId", "createdAt");

ALTER TABLE "User" DROP CONSTRAINT IF EXISTS "User_role_check";
ALTER TABLE "User" ADD CONSTRAINT "User_role_check" CHECK (role IN ('USER', 'ADMIN'));
ALTER TABLE "User" DROP CONSTRAINT IF EXISTS "User_plan_check";
ALTER TABLE "User" ADD CONSTRAINT "User_plan_check" CHECK (plan IN ('FREE', 'PRO', 'AGENCY'));
ALTER TABLE "WorkspaceMember" DROP CONSTRAINT IF EXISTS "WorkspaceMember_role_check";
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_role_check" CHECK (role IN ('OWNER', 'ADMIN', 'MEMBER'));
ALTER TABLE "SupportRequest" DROP CONSTRAINT IF EXISTS "SupportRequest_status_check";
ALTER TABLE "SupportRequest" ADD CONSTRAINT "SupportRequest_status_check" CHECK (status IN ('OPEN', 'IN_PROGRESS', 'CLOSED'));

-- Apply after data repair:
-- ALTER TABLE "Document" ALTER COLUMN "workspaceId" SET NOT NULL;
-- ALTER TABLE "Document" ALTER COLUMN "userId" SET NOT NULL;
-- ALTER TABLE "User" ADD CONSTRAINT "User_role_check" CHECK (role IN ('USER', 'ADMIN'));
-- ALTER TABLE "User" ADD CONSTRAINT "User_plan_check" CHECK (plan IN ('FREE', 'PRO', 'AGENCY'));
-- ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_role_check" CHECK (role IN ('OWNER', 'ADMIN', 'MEMBER'));
-- ALTER TABLE "SupportRequest" ADD CONSTRAINT "SupportRequest_status_check" CHECK (status IN ('OPEN', 'IN_PROGRESS', 'CLOSED'));
