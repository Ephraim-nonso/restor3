import nodemailer from "nodemailer";

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_APP_PASSWORD, // Your Gmail App Password
    },
  });
};

// Email template for verification code
const createVerificationEmailTemplate = (code: string, email: string) => {
  return {
    from: `"Restor3" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Restor3 Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #059669; font-size: 28px; margin: 0;">Restor3</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0;">Email Verification</p>
        </div>
        
        <div style="background: #f9fafb; border-radius: 8px; padding: 30px; margin-bottom: 20px;">
          <h2 style="color: #111827; margin: 0 0 15px 0; font-size: 20px;">Your Verification Code</h2>
          <p style="color: #6b7280; margin: 0 0 20px 0; line-height: 1.5;">
            Please use the following verification code to complete your email verification:
          </p>
          
          <div style="background: white; border: 2px solid #059669; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #059669; letter-spacing: 5px; font-family: 'Courier New', monospace;">
              ${code}
            </span>
          </div>
          
          <p style="color: #6b7280; margin: 20px 0 0 0; font-size: 14px;">
            This code will expire in 5 minutes for security reasons.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            If you didn't request this verification code, please ignore this email.
          </p>
          <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0;">
            This is an automated message, please do not reply to this email.
          </p>
        </div>
      </div>
    `,
    text: `
      Restor3 - Email Verification
      
      Your verification code is: ${code}
      
      This code will expire in 5 minutes for security reasons.
      
      If you didn't request this verification code, please ignore this email.
    `,
  };
};

// Send verification email
export const sendVerificationEmail = async (
  email: string,
  code: string
): Promise<boolean> => {
  try {
    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error(
        "Email configuration missing. Please set EMAIL_USER and EMAIL_APP_PASSWORD environment variables."
      );
      return false;
    }

    const transporter = createTransporter();
    const mailOptions = createVerificationEmailTemplate(code, email);

    const result = await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully:", result.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return false;
  }
};

// Test email configuration
export const testEmailConfiguration = async (): Promise<boolean> => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      return false;
    }

    const transporter = createTransporter();
    await transporter.verify();
    console.log("Email configuration is valid");
    return true;
  } catch (error) {
    console.error("Email configuration test failed:", error);
    return false;
  }
};
