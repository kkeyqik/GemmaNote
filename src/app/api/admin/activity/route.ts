import { errorResponse, requireAdminUser } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminUser();

    const [latestUsers, latestDocuments, latestSupport, latestVoicePresets] = await Promise.all([
      prisma.user.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          plan: true,
          role: true,
          createdAt: true,
        },
      }),
      prisma.document.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          wordCount: true,
          createdAt: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      }),
      prisma.supportRequest.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          subject: true,
          status: true,
          createdAt: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      }),
      prisma.voicePreset.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          createdAt: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      }),
    ]);

    type ActivityItem = {
      id: string;
      type: "user_registered" | "document_created" | "support_ticket" | "voice_preset";
      title: string;
      description: string;
      userEmail?: string;
      createdAt: string;
      timestamp: Date;
    };

    const activities: ActivityItem[] = [];

    latestUsers.forEach((u) => {
      activities.push({
        id: `user-${u.id}`,
        type: "user_registered",
        title: u.email || "New User",
        description: `Registered new account (${u.plan || "FREE"} plan)`,
        userEmail: u.email,
        createdAt: u.createdAt.toISOString(),
        timestamp: u.createdAt,
      });
    });

    latestDocuments.forEach((d) => {
      activities.push({
        id: `doc-${d.id}`,
        type: "document_created",
        title: d.title || "Untitled Document",
        description: `Created document (${d.wordCount || 0} words)`,
        userEmail: d.user?.email || "Unknown user",
        createdAt: d.createdAt.toISOString(),
        timestamp: d.createdAt,
      });
    });

    latestSupport.forEach((s) => {
      activities.push({
        id: `support-${s.id}`,
        type: "support_ticket",
        title: s.subject || "Support Ticket",
        description: `Submitted support ticket (Status: ${s.status})`,
        userEmail: s.user?.email || "Unknown user",
        createdAt: s.createdAt.toISOString(),
        timestamp: s.createdAt,
      });
    });

    latestVoicePresets.forEach((v) => {
      activities.push({
        id: `voice-${v.id}`,
        type: "voice_preset",
        title: v.name || "Voice Preset",
        description: `Created voice preset "${v.name}"`,
        userEmail: v.user?.email || "Unknown user",
        createdAt: v.createdAt.toISOString(),
        timestamp: v.createdAt,
      });
    });

    activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    const result = activities.slice(0, 10).map(({ timestamp, ...rest }) => rest);

    return Response.json({
      activities: result,
    });
  } catch (error) {
    return errorResponse(error, "Failed to fetch activity log");
  }
}
