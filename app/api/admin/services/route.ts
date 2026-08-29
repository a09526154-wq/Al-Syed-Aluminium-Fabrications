import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { services } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";
import { requireAdminOrStaff } from "@/lib/admin-auth";

export async function GET() {
  const authCheck = await requireAdminOrStaff();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status || 401 });
  }

  try {
    const list = await db.select().from(services).orderBy(asc(services.order));
    return NextResponse.json({ success: true, services: list });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch services" },
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
    const { title, slug, description, iconOrImage, order } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Service title and description are required" }, { status: 400 });
    }

    const autoSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const [newService] = await db
      .insert(services)
      .values({
        title,
        slug: autoSlug,
        description,
        iconOrImage: iconOrImage || null,
        order: Number(order) || 0,
      })
      .returning();

    return NextResponse.json({ success: true, service: newService });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create service" },
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
    const { id, title, slug, description, iconOrImage, order } = body;

    if (!id || !title || !description) {
      return NextResponse.json({ error: "Service ID, title, and description are required" }, { status: 400 });
    }

    const autoSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const [updatedService] = await db
      .update(services)
      .set({
        title,
        slug: autoSlug,
        description,
        iconOrImage: iconOrImage || null,
        order: Number(order) || 0,
      })
      .where(eq(services.id, id))
      .returning();

    return NextResponse.json({ success: true, service: updatedService });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update service" },
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
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    await db.delete(services).where(eq(services.id, id));
    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete service" },
      { status: 500 }
    );
  }
}
