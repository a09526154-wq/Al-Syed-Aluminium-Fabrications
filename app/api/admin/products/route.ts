import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { requireAdminOrStaff } from "@/lib/admin-auth";

export async function GET() {
  const authCheck = await requireAdminOrStaff();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status || 401 });
  }

  try {
    const list = await db.select().from(products).orderBy(desc(products.createdAt));
    return NextResponse.json({ success: true, products: list });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch products" },
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
    const { name, category, description, specs, imageUrl } = body;

    if (!name || !category || !description) {
      return NextResponse.json({ error: "Name, category, and description are required" }, { status: 400 });
    }

    const [newProduct] = await db
      .insert(products)
      .values({
        name,
        category,
        description,
        specs: specs || null,
        imageUrl: imageUrl || null,
      })
      .returning();

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create product" },
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
    const { id, name, category, description, specs, imageUrl } = body;

    if (!id || !name || !category || !description) {
      return NextResponse.json({ error: "ID, name, category, and description are required" }, { status: 400 });
    }

    const [updatedProduct] = await db
      .update(products)
      .set({
        name,
        category,
        description,
        specs: specs || null,
        imageUrl: imageUrl || null,
      })
      .where(eq(products.id, id))
      .returning();

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update product" },
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
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await db.delete(products).where(eq(products.id, id));
    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete product" },
      { status: 500 }
    );
  }
}
