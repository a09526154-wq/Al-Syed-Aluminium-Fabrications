import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { requireAdminOrStaff } from "@/lib/admin-auth";

export async function GET() {
  const authCheck = await requireAdminOrStaff();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status || 401 });
  }

  try {
    const list = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
    return NextResponse.json({ success: true, testimonials: list });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch testimonials" },
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
    const { id, approved, clientName, message, rating } = body;

    if (!id) {
      return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
    }

    const updatePayload: Record<string, unknown> = {};
    if (typeof approved === "boolean") updatePayload.approved = approved;
    if (clientName) updatePayload.clientName = clientName;
    if (message) updatePayload.message = message;
    if (rating) updatePayload.rating = rating;

    const [updatedItem] = await db
      .update(testimonials)
      .set(updatePayload)
      .where(eq(testimonials.id, id))
      .returning();

    return NextResponse.json({ success: true, testimonial: updatedItem });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update testimonial" },
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
      return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
    }

    await db.delete(testimonials).where(eq(testimonials.id, id));
    return NextResponse.json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
