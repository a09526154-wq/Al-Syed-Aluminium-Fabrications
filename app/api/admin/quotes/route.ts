import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quoteRequests } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { requireAdminOrStaff } from "@/lib/admin-auth";

export async function GET(request: Request) {
  const authCheck = await requireAdminOrStaff();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status || 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let quotes;
    if (status && status !== "all") {
      quotes = await db
        .select()
        .from(quoteRequests)
        .where(eq(quoteRequests.status, status as "new" | "contacted" | "closed"))
        .orderBy(desc(quoteRequests.createdAt));
    } else {
      quotes = await db
        .select()
        .from(quoteRequests)
        .orderBy(desc(quoteRequests.createdAt));
    }

    return NextResponse.json({ success: true, quotes });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch quotes" },
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
      return NextResponse.json({ error: "Quote ID and status are required" }, { status: 400 });
    }

    const [updatedQuote] = await db
      .update(quoteRequests)
      .set({ status })
      .where(eq(quoteRequests.id, id))
      .returning();

    return NextResponse.json({ success: true, quote: updatedQuote });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update quote status" },
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
      return NextResponse.json({ error: "Quote ID is required" }, { status: 400 });
    }

    await db.delete(quoteRequests).where(eq(quoteRequests.id, id));
    return NextResponse.json({ success: true, message: "Quote deleted successfully" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete quote" },
      { status: 500 }
    );
  }
}
