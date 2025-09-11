import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    // Validate input
    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and verification code are required" },
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

    // Validate code format (5 digits)
    if (!/^\d{5}$/.test(code)) {
      return NextResponse.json(
        { error: "Invalid verification code format" },
        { status: 400 }
      );
    }

    // Send the verification email
    const emailSent = await sendVerificationEmail(email, code);

    if (emailSent) {
      return NextResponse.json(
        { success: true, message: "Verification email sent successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to send verification email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in send-verification-email API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
