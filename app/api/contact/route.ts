import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/schema";
import { ContactSchema } from "@/lib/validations";
import { sendNotificationEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = ContactSchema.parse(json);

    // 1. Insert into Neon DB
    const [newMessage] = await db
      .insert(contactMessages)
      .values({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        message: validatedData.message,
        status: "new",
      })
      .returning();

    // 2. Send email notification via Resend
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0B0F1A; border-bottom: 2px solid #C9A24B; padding-bottom: 10px;">
          New Contact Message — Al Syed Fabrications
        </h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
        <p><strong>Phone:</strong> ${validatedData.phone || "Not provided"}</p>
        <div style="background-color: #f8fafc; padding: 12px; border-radius: 6px; margin: 15px 0;">
          <strong>Message:</strong><br/>
          <p style="margin: 6px 0 0 0; white-space: pre-wrap;">${validatedData.message}</p>
        </div>
        <p style="font-size: 12px; color: #64748b; margin-top: 20px;">
          Received at: ${new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" })} (PKT)
        </p>
      </div>
    `;

    await sendNotificationEmail({
      subject: `New Contact Message from ${validatedData.name}`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      messageId: newMessage.id,
      message: "Your message has been received successfully.",
    });
  } catch (error: unknown) {
    console.error("❌ Contact message error:", error);
    if (error && typeof error === "object" && "name" in error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process contact message",
      },
      { status: 500 }
    );
  }
}
