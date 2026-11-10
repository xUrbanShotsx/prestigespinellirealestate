import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, phone, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Spinelli Prestige <onboarding@resend.dev>",
      to: ["prestige@spinellire.com"],
      replyTo: email,
      subject: `Prestige Enquiry — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #000;">
          <div style="background-color: #000; padding: 24px 32px;">
            <h1 style="color: #ffffff; font-size: 20px; font-weight: 400; margin: 0;">Prestige Enquiry</h1>
            <p style="color: rgba(255,255,255,0.5); font-size: 11px; margin: 4px 0 0; letter-spacing: 0.1em; text-transform: uppercase;">prestige.spinellirealestate.com.au</p>
          </div>
          <div style="padding: 32px; border: 1px solid #E8E5DF; border-top: none;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
              <tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px; width: 120px;">Name</td><td style="padding: 8px 0; font-size: 13px;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Email</td><td style="padding: 8px 0; font-size: 13px;"><a href="mailto:${email}" style="color: #000;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Phone</td><td style="padding: 8px 0; font-size: 13px;"><a href="tel:${phone}" style="color: #000;">${phone}</a></td></tr>` : ""}
            </table>
            <h2 style="font-size: 14px; font-weight: 600; margin: 0 0 10px;">Message</h2>
            <p style="font-size: 14px; line-height: 1.7; padding: 16px; background: #F8F9FA; border-left: 3px solid #000; margin: 0;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Prestige contact error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
