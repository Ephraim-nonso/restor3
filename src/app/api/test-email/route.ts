import { NextRequest, NextResponse } from "next/server";
import { testEmailConfiguration, sendVerificationEmail } from "@/lib/email";

export async function GET() {
  try {
    // Test email configuration
    const isConfigured = await testEmailConfiguration();

    if (!isConfigured) {
      return NextResponse.json(
        {
          success: false,
          error: "Email configuration is missing or invalid",
          message:
            "Please check your EMAIL_USER and EMAIL_APP_PASSWORD environment variables",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email configuration is valid and ready to use",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error testing email configuration:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to test email configuration",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required" },
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

    // Send a test verification email
    const testCode = "12345";
    const emailSent = await sendVerificationEmail(email, testCode);

    if (emailSent) {
      return NextResponse.json(
        {
          success: true,
          message: `Test email sent successfully to ${email}`,
          note: "Check your inbox for the verification email with code: 12345",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to send test email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending test email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
