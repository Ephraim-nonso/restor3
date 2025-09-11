# Email Setup Instructions

To enable email verification codes in production, you need to set up Gmail SMTP with an App Password.

## Step 1: Enable 2-Factor Authentication

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** > **2-Step Verification**
3. Enable 2-Step Verification if it's not already enabled

## Step 2: Generate App Password

1. In the same Security section, find **App passwords**
2. Click **Generate app password**
3. Select **Mail** as the app type
4. Select your device or enter a custom name
5. Click **Generate**
6. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

## Step 3: Set Environment Variables

Create a `.env.local` file in your project root with:

```bash
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-16-character-app-password

# NextAuth Configuration (if using)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here
```

## Step 4: Test the Setup

1. Start your development server: `yarn dev`
2. Try the email verification flow
3. Check your email inbox for the verification code

## Important Notes

- **Never use your regular Gmail password** - always use the App Password
- The App Password is 16 characters without spaces
- Keep your App Password secure and don't commit it to version control
- The `.env.local` file should be in your `.gitignore`

## Troubleshooting

If emails aren't being sent:

1. Verify your App Password is correct (16 characters, no spaces)
2. Check that 2-Factor Authentication is enabled
3. Ensure your Gmail account allows "Less secure app access" (though App Passwords should work regardless)
4. Check the server console for error messages
5. Verify the EMAIL_USER matches the Gmail account where you generated the App Password

## Alternative Email Services

If you prefer not to use Gmail, you can modify the email service in `src/lib/email.ts` to use:

- **SendGrid** (recommended for production)
- **Mailgun**
- **Amazon SES**
- **Resend**

Each service has different configuration requirements.
