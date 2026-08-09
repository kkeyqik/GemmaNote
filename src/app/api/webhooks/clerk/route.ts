import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { captureException } from "@/lib/sentry";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.warn("[Clerk Webhook Warning]: CLERK_WEBHOOK_SECRET environment variable is missing.");
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json(
        { message: "CLERK_WEBHOOK_SECRET is missing, ignoring webhook in dev environment" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { error: "CLERK_WEBHOOK_SECRET is not configured" },
      { status: 500 }
    );
  }

  // Get Svix headers for signature verification
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing required svix headers" },
      { status: 400 }
    );
  }

  // Get raw payload body as text for verification
  const body = await req.text();

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("[Clerk Webhook Error]: Signature verification failed", err);
    captureException(err, { context: "Clerk Webhook Signature Verification Failed" });
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }

  const { type, data } = evt;

  try {
    if (type === "user.created" || type === "user.updated") {
      const clerkId = data.id;
      if (!clerkId) {
        return NextResponse.json(
          { error: "User ID missing from webhook payload" },
          { status: 400 }
        );
      }

      // Extract primary email address
      const emailAddresses = data.email_addresses || [];
      const primaryEmailId = data.primary_email_address_id;
      const primaryEmailObj = emailAddresses.find((e) => e.id === primaryEmailId);
      const email = primaryEmailObj?.email_address || emailAddresses[0]?.email_address || `${clerkId}@user.clerk.dev`;

      // Clean upsert of User row in PostgreSQL
      await prisma.user.upsert({
        where: { clerkId },
        create: {
          clerkId,
          email,
        },
        update: {
          email,
        },
      });

      return NextResponse.json({ success: true, event: type }, { status: 200 });
    }

    if (type === "user.deleted") {
      const clerkId = data.id;
      if (clerkId) {
        // Clean deletion of User row in PostgreSQL
        await prisma.user.deleteMany({
          where: { clerkId },
        });
      }

      return NextResponse.json({ success: true, event: type }, { status: 200 });
    }

    return NextResponse.json({ success: true, message: `Event ${type} ignored` }, { status: 200 });
  } catch (err) {
    console.error(`[Clerk Webhook Error]: Failed to process ${type} event`, err);
    captureException(err, { eventType: type, userId: data?.id });
    return NextResponse.json(
      { error: "Internal server error processing webhook" },
      { status: 500 }
    );
  }
}
