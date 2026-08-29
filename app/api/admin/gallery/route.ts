import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { galleryItems } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { requireAdminOrStaff } from "@/lib/admin-auth";

export async function GET() {
  const authCheck = await requireAdminOrStaff();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status || 401 });
  }

  try {
    const items = await db.select().from(galleryItems).orderBy(desc(galleryItems.createdAt));
    return NextResponse.json({ success: true, items });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authCheck = await requireAdminOrStaff();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status || 401 });
  }

  try {
    const body = await request.json();
    const { title, category, imageUrl, cloudinaryPublicId, projectType } = body;

    if (!title || !category || !imageUrl) {
      return NextResponse.json({ error: "Title, category, and image URL are required" }, { status: 400 });
    }

    const [newItem] = await db
      .insert(galleryItems)
      .values({
        title,
        category,
        imageUrl,
        cloudinaryPublicId: cloudinaryPublicId || null,
        projectType: projectType || "Residential",
      })
      .returning();

    return NextResponse.json({ success: true, item: newItem });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create gallery item" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const authCheck = await requireAdminOrStaff();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status || 401 });
  }

  try {
    const body = await request.json();
    const { id, title, category, projectType, imageUrl } = body;

    if (!id || !title || !category) {
      return NextResponse.json({ error: "ID, title, and category are required" }, { status: 400 });
    }

    const updateData: Record<string, unknown> = { title, category, projectType };
    if (imageUrl) updateData.imageUrl = imageUrl;

    const [updatedItem] = await db
      .update(galleryItems)
      .set(updateData)
      .where(eq(galleryItems.id, id))
      .returning();

    return NextResponse.json({ success: true, item: updatedItem });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update gallery item" },
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
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    await db.delete(galleryItems).where(eq(galleryItems.id, id));
    return NextResponse.json({ success: true, message: "Gallery item deleted" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
