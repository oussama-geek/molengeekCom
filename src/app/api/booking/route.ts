import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, preferredSite, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !preferredSite) {
      return NextResponse.json(
        { error: "Name, email, phone, and preferred site are required" },
        { status: 400 }
      );
    }

    // Map site IDs to readable names
    const siteNames: Record<string, string> = {
      frame: "Frame",
      molenbeek: "Molenbeek",
      roubaix: "Roubaix",
      luxembourg: "Luxembourg",
      maroc: "Maroc",
    };

    const siteName = siteNames[preferredSite] || preferredSite;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Booking Form <onboarding@resend.dev>", // You'll need to verify your domain with Resend
      to: ["info@molengeek.com"],
      subject: `New Booking Request - ${siteName}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Preferred Site:</strong> ${siteName}</p>
        ${message ? `<p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>` : ""}
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Booking request sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

