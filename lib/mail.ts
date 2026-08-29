import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

interface SendNotificationEmailParams {
  subject: string;
  html: string;
  to?: string;
}

export async function sendNotificationEmail({
  subject,
  html,
  to = "alsyedaluminium@gmail.com",
}: SendNotificationEmailParams) {
  try {
    if (!resend || !apiKey || apiKey.includes("mock") || apiKey.includes("demo")) {
      console.log("📧 [Resend Notification Simulation]:");
      console.log(`   To: ${to}`);
      console.log(`   Subject: ${subject}`);
      console.log(`   Preview: ${html.replace(/<[^>]*>?/gm, " ").slice(0, 150)}...`);
      return { success: true, simulated: true };
    }

    const data = await resend.emails.send({
      from: "Al Syed Notifications <notifications@alsyedfabrications.com>",
      to: [to],
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error("❌ Failed to send notification email via Resend:", error);
    // Don't throw so database record is still safely persisted
    return { success: false, error };
  }
}
