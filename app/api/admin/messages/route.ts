import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { requireAdminOrStaff } from "@/lib/admin-auth";

export async function GET() {
  const authCheck = await requireAdminOrStaff();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status || 401 });
  }

  try {
    const messages = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
    return NextResponse.json({ success: true, messages });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const authCheck = await requireAdminOrStaff();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status || 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Message ID and status are required" }, { status: 400 });
    }

    const [updatedMessage] = await db
      .update(contactMessages)
      .set({ status })
      .where(eq(contactMessages.id, id))
      .returning();

    return NextResponse.json({ success: true, message: updatedMessage });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update message status" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const authCheck = await requireAdminOrStaff();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status || 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return NextResponse.json({ success: true, message: "Contact message deleted" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete message" },
      { status: 500 }
    );
  }
}
