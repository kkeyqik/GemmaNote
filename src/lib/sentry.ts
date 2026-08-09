/**
 * Production error logging & monitoring helper.
 * Safely captures exceptions with context and timestamps.
 */

export interface ErrorContext {
  [key: string]: unknown;
}

export function captureException(error: unknown, context?: ErrorContext): void {
  try {
    const timestamp = new Date().toISOString();
    const formattedError =
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : {
            message: typeof error === "object" && error !== null ? JSON.stringify(error) : String(error),
          };

    const logPayload = {
      timestamp,
      error: formattedError,
      context: context ?? {},
      environment: process.env.NODE_ENV ?? "development",
    };

    console.error(`[ERROR_MONITORING ${timestamp}]`, JSON.stringify(logPayload, null, 2));
  } catch (loggingError) {
    console.error("[ERROR_MONITORING_FALLBACK]", error, context, loggingError);
  }
}
