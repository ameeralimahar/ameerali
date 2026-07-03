import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Use anon client for public inserts (RLS allows this)
function getAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { project_slug, project_title, inquiry_type, name, email, message } = body;

    // Validation
    if (!project_slug || !project_title || !inquiry_type || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate inquiry type
    const validTypes = ["discuss", "custom_version", "hire", "other"];
    if (!validTypes.includes(inquiry_type)) {
      return NextResponse.json(
        { error: "Invalid inquiry type" },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const supabase = getAnonClient();
    const { data, error } = await supabase
      .from("project_inquiries")
      .insert({
        project_slug,
        project_title,
        inquiry_type,
        name,
        email,
        message: message || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save inquiry" },
        { status: 500 }
      );
    }

    // Send email notification (fail gracefully)
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      const notifyEmail = process.env.NOTIFY_EMAIL;

      if (resendApiKey && notifyEmail) {
        const resend = new Resend(resendApiKey);

        const inquiryTypeLabels: Record<string, string> = {
          discuss: "Discuss the work",
          custom_version: "Request a custom/modified version",
          hire: "Hire for similar work",
          other: "Other",
        };

        await resend.emails.send({
          from: "Portfolio Inquiries <onboarding@resend.dev>", // Change this to your verified domain
          to: notifyEmail,
          subject: `New project inquiry: ${project_title} (${inquiryTypeLabels[inquiry_type]})`,
          html: `
            <h2>New Project Inquiry</h2>
            <p><strong>Project:</strong> ${project_title} (${project_slug})</p>
            <p><strong>Inquiry Type:</strong> ${inquiryTypeLabels[inquiry_type]}</p>
            <hr />
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${message ? `<p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>` : ""}
            <hr />
            <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
          `,
        });
      } else {
        console.warn("RESEND_API_KEY or NOTIFY_EMAIL not configured — email not sent");
      }
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (error) {
    console.error("Project inquiry error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
