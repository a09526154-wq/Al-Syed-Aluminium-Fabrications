import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/schema";
import { TestimonialSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = TestimonialSchema.parse(json);

    const [newTestimonial] = await db
      .insert(testimonials)
      .values({
        clientName: validatedData.clientName,
        message: validatedData.message,
        rating: validatedData.rating,
        approved: false, // Pending admin approval
      })
      .returning();

    return NextResponse.json({
      success: true,
      testimonialId: newTestimonial.id,
      message: "Thank you for your feedback! Your review has been submitted for moderation.",
    });
  } catch (error: unknown) {
    console.error("❌ Testimonial submission error:", error);
    if (error && typeof error === "object" && "name" in error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to submit testimonial",
      },
      { status: 500 }
    );
  }
}
