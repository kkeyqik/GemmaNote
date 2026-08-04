import "server-only";

import type { Document } from "@/generated/prisma/client.js";
import { ApiError } from "@/lib/app-auth";

export type DocumentInput = {
  title?: unknown;
  content?: unknown;
  plainText?: unknown;
  keywords?: unknown;
  wordCount?: unknown;
  isGenerated?: unknown;
  isFavorite?: unknown;
  isTrash?: unknown;
  isArchived?: unknown;
  trashedAt?: unknown;
  externalId?: unknown;
  workspaceId?: unknown;
};

function stringValue(value: unknown, field: string, maxLength: number, fallback = "") {
  if (value === undefined) return fallback;
  if (typeof value !== "string" || value.length > maxLength) {
    throw new ApiError(400, `Invalid ${field}`);
  }
  return value;
}

function booleanValue(value: unknown, field: string, fallback = false) {
  if (value === undefined) return fallback;
  if (typeof value !== "boolean") throw new ApiError(400, `Invalid ${field}`);
  return value;
}

export function parseDocumentInput(input: DocumentInput) {
  const trashedAtRaw = input.trashedAt;
  const trashedAt = trashedAtRaw === undefined || trashedAtRaw === null
    ? null
    : new Date(stringValue(trashedAtRaw, "trashedAt", 40));

  if (trashedAt && Number.isNaN(trashedAt.getTime())) {
    throw new ApiError(400, "Invalid trashedAt");
  }

  const wordCount = input.wordCount === undefined ? 0 : input.wordCount;
  if (!Number.isInteger(wordCount) || (wordCount as number) < 0 || (wordCount as number) > 1_000_000) {
    throw new ApiError(400, "Invalid wordCount");
  }

  return {
    title: stringValue(input.title, "title", 200, "Untitled"),
    content: stringValue(input.content, "content", 2_000_000),
    plainText: stringValue(input.plainText, "plainText", 2_000_000),
    keywords: stringValue(input.keywords, "keywords", 2_000),
    wordCount: wordCount as number,
    isGenerated: booleanValue(input.isGenerated, "isGenerated"),
    isFavorite: booleanValue(input.isFavorite, "isFavorite"),
    isTrash: booleanValue(input.isTrash, "isTrash"),
    isArchived: booleanValue(input.isArchived, "isArchived"),
    trashedAt,
    externalId: input.externalId === undefined ? null : stringValue(input.externalId, "externalId", 200),
    workspaceId: input.workspaceId === undefined ? null : stringValue(input.workspaceId, "workspaceId", 100),
  };
}

export function documentDto(document: Document) {
  return {
    id: document.id,
    externalId: document.externalId,
    title: document.title,
    content: document.content ?? "",
    plainText: document.plainText,
    keywords: document.keywords,
    wordCount: document.wordCount,
    isGenerated: document.isGenerated,
    isFavorite: document.isFavorite,
    isTrash: document.isTrash,
    isArchived: document.isArchived,
    trashedAt: document.trashedAt?.toISOString() ?? null,
    workspaceId: document.workspaceId,
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
  };
}
