import "server-only";

import { ApiError } from "@/lib/app-auth";

const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "s", "h1", "h2", "h3",
  "ul", "ol", "li", "blockquote", "code", "pre", "table", "thead",
  "tbody", "tr", "th", "td", "hr",
]);
const VOID_TAGS = new Set(["br", "hr"]);

function safeUrl(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return !normalized.startsWith("javascript:") &&
    !normalized.startsWith("data:") &&
    !normalized.startsWith("vbscript:") &&
    !normalized.startsWith("file:");
}

/** Conservative server-side HTML allowlist sanitizer. */
export function sanitizeDocumentHtml(input: string): string {
  if (!input) return "";
  return input
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\s*(script|style|iframe|object|embed|form|svg|math|link|meta|base)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|style|iframe|object|embed|form|svg|math|link|meta|base)[^>]*\/?>/gi, "")
    .replace(/<\s*\/?\s*([a-z0-9]+)([^>]*)>/gi, (_match, rawTag: string, rawAttributes: string) => {
      const tag = rawTag.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) return "";
      if (VOID_TAGS.has(tag)) return `<${tag}>`;
      const attributes: string[] = [];
      rawAttributes.replace(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g, (_attr, name: string, doubleValue?: string, singleValue?: string, bareValue?: string) => {
        const normalizedName = name.toLowerCase();
        const value = doubleValue ?? singleValue ?? bareValue ?? "";
        if (normalizedName.startsWith("on") || normalizedName === "style") return "";
        if ((normalizedName === "href" || normalizedName === "src") && !safeUrl(value)) return "";
        if (["colspan", "rowspan", "scope"].includes(normalizedName)) {
          attributes.push(`${normalizedName}="${value.replace(/["<>]/g, "")}"`);
        }
        return "";
      });
      const closing = /^\s*\//.test(rawAttributes) ? `</${tag}>` : `<${tag}${attributes.length ? ` ${attributes.join(" ")}` : ""}>`;
      return closing;
    });
}

export function sanitizeDocumentContent(input: unknown): string {
  if (typeof input !== "string" || input.length > 2_000_000) {
    throw new ApiError(400, "Invalid content");
  }
  return sanitizeDocumentHtml(input);
}
