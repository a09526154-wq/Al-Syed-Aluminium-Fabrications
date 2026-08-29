import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/schema";
import { requireAdminOrStaff, requireAdminRole } from "@/lib/admin-auth";

export async function GET() {
  const authCheck = await requireAdminOrStaff();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status || 401 });
  }

  try {
    const settingsList = await db.select().from(siteSettings);
    const settingsMap: Record<string, string> = {};
    for (const s of settingsList) {
      settingsMap[s.key] = s.value;
    }

    return NextResponse.json({ success: true, settings: settingsMap, role: authCheck.user?.role });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  // Only users with 'admin' role can save settings
  const authCheck = await requireAdminRole();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status || 403 });
  }

  try {
    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== "object") {
      return NextResponse.json({ error: "Invalid settings payload" }, { status: 400 });
    }

    for (const [key, value] of Object.entries(settings)) {
      if (typeof value === "string") {
        await db
          .insert(siteSettings)
          .values({
            key,
            value,
            updatedAt: new Date(),
          })
          .onConflictDoUpdate({
            target: siteSettings.key,
            set: { value, updatedAt: new Date() },
          });
      }
    }

    return NextResponse.json({ success: true, message: "Site settings updated successfully" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save settings" },
      { status: 500 }
    );
  }
}
