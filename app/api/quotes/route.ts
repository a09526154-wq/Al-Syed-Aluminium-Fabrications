import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quoteRequests } from "@/lib/schema";
import { QuoteSchema } from "@/lib/validations";
import { sendNotificationEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = QuoteSchema.parse(json);

    // 1. Insert into Neon PostgreSQL DB
    const [newQuote] = await db
      .insert(quoteRequests)
      .values({
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email || null,
        projectType: validatedData.projectType,
        description: validatedData.description,
        location: validatedData.location,
        imageUrls: validatedData.imageUrls,
        status: "new",
      })
      .returning();

    // 2. Send email notification via Resend
    const photoLinksHtml =
      validatedData.imageUrls.length > 0
        ? `<div style="margin-top: 15px;">
             <strong>Attached Photos (${validatedData.imageUrls.length}):</strong><br/>
             ${validatedData.imageUrls
               .map(
                 (url, idx) =>
                   `<a href="${url}" target="_blank" style="display:inline-block; margin: 4px; color: #1E5FA8;">Photo ${idx + 1}</a>`
               )
               .join(" | ")}
           </div>`
        : "";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0B0F1A; border-bottom: 2px solid #C9A24B; padding-bottom: 10px;">
          New Quote Request — Al Syed Fabrications
        </h2>
        <p><strong>Customer Name:</strong> ${validatedData.name}</p>
        <p><strong>Phone / WhatsApp:</strong> <a href="tel:${validatedData.phone}">${validatedData.phone}</a></p>
        <p><strong>Email:</strong> ${validatedData.email || "Not provided"}</p>
        <p><strong>Project Type:</strong> ${validatedData.projectType}</p>
        <p><strong>Location:</strong> ${validatedData.location}</p>
        <div style="background-color: #f8fafc; padding: 12px; border-radius: 6px; margin: 15px 0;">
          <strong>Project Details & Dimensions:</strong><br/>
          <p style="margin: 6px 0 0 0; white-space: pre-wrap;">${validatedData.description}</p>
        </div>
        ${photoLinksHtml}
        <p style="font-size: 12px; color: #64748b; margin-top: 20px;">
          Received at: ${new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" })} (PKT)
        </p>
      </div>
    `;

    await sendNotificationEmail({
      subject: `New Quote Request: ${validatedData.projectType} from ${validatedData.name}`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      quoteId: newQuote.id,
      message: "Quote request submitted successfully.",
    });
  } catch (error: unknown) {
    console.error("❌ Quote submission error:", error);
    if (error && typeof error === "object" && "name" in error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process quote request",
      },
      { status: 500 }
    );
  }
}
