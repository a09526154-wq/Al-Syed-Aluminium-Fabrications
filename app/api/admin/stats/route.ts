import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  quoteRequests,
  contactMessages,
  galleryItems,
  testimonials,
  services,
  products,
} from "@/lib/schema";
import { eq, desc, count } from "drizzle-orm";
import { requireAdminOrStaff } from "@/lib/admin-auth";

export async function GET() {
  const authCheck = await requireAdminOrStaff();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status || 401 });
  }

  try {
    const [quotesCount] = await db
      .select({ count: count() })
      .from(quoteRequests)
      .where(eq(quoteRequests.status, "new"));

    const [allQuotesCount] = await db
      .select({ count: count() })
      .from(quoteRequests);

    const [messagesCount] = await db
      .select({ count: count() })
      .from(contactMessages)
      .where(eq(contactMessages.status, "new"));

    const [galleryCount] = await db
      .select({ count: count() })
      .from(galleryItems);

    const [pendingTestimonialsCount] = await db
      .select({ count: count() })
      .from(testimonials)
      .where(eq(testimonials.approved, false));

    const [servicesCount] = await db
      .select({ count: count() })
      .from(services);

    const [productsCount] = await db
      .select({ count: count() })
      .from(products);

    const recentQuotes = await db
      .select()
      .from(quoteRequests)
      .orderBy(desc(quoteRequests.createdAt))
      .limit(5);

    const recentMessages = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(5);

    return NextResponse.json({
      success: true,
      stats: {
        newQuotes: quotesCount.count,
        totalQuotes: allQuotesCount.count,
        newMessages: messagesCount.count,
        totalGallery: galleryCount.count,
        pendingTestimonials: pendingTestimonialsCount.count,
        totalServices: servicesCount.count,
        totalProducts: productsCount.count,
      },
      recentQuotes,
      recentMessages,
    });
  } catch (error: unknown) {
    console.error("❌ Admin stats error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load admin stats" },
      { status: 500 }
    );
  }
}
