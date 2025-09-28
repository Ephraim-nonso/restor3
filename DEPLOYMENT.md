# Restor3 Deployment Guide

## Multi-Domain Hosting Setup

This guide will help you deploy Restor3 to both your custom domain `restor3.io` and the Vercel subdomain `restor3.vercel.app`.

## Prerequisites

1. **Domain**: You have `restor3.io` domain
2. **Vercel Account**: Connected to your GitHub repository
3. **Google OAuth**: Configured for both domains
4. **WalletConnect**: Project ID configured

## Step 1: Vercel Project Setup

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import your GitHub repository
3. Configure build settings:
   - Framework Preset: Next.js
   - Build Command: `yarn build`
   - Output Directory: `.next`

## Step 2: Environment Variables

Set these environment variables in Vercel:

### Required Variables:

```
NEXTAUTH_URL=https://restor3.io
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id
```

### For Development:

```
NEXTAUTH_URL=http://localhost:3000
```

## Step 3: Custom Domain Configuration

### In Vercel Dashboard:

1. Go to your project settings
2. Navigate to "Domains"
3. Add `restor3.io` as a custom domain
4. Add `www.restor3.io` (optional)

### DNS Configuration:

Configure your DNS records:

```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Step 4: Google OAuth Configuration

### In Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Credentials"
3. Edit your OAuth 2.0 Client ID
4. Add authorized redirect URIs:
   - `https://restor3.io/api/auth/callback/google`
   - `https://restor3.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for development)

## Step 5: Deployment

### Automatic Deployment:

- Push to `main` branch triggers automatic deployment
- Both domains will be updated simultaneously

### Manual Deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Step 6: Testing

Test both domains:

1. **Custom Domain**: https://restor3.io
2. **Vercel Subdomain**: https://restor3.vercel.app

### Test Checklist:

- [ ] Google OAuth works on both domains
- [ ] Wallet connection works
- [ ] Email verification works
- [ ] Dashboard loads correctly
- [ ] All features function properly

## Step 7: SSL Certificate

Vercel automatically provides SSL certificates for both domains:

- `restor3.io` - Custom domain SSL
- `restor3.vercel.app` - Vercel SSL

## Troubleshooting

### Common Issues:

1. **OAuth Redirect Mismatch**:

   - Ensure all domains are added to Google OAuth
   - Check NEXTAUTH_URL environment variable

2. **Domain Not Loading**:

   - Verify DNS configuration
   - Check domain status in Vercel

3. **SSL Issues**:
   - Wait for SSL certificate propagation (up to 24 hours)
   - Check domain configuration in Vercel

## Monitoring

Monitor your deployment:

- Vercel Analytics
- Error tracking
- Performance monitoring

## Support

For issues:

1. Check Vercel deployment logs
2. Verify environment variables
3. Test locally first
4. Check Google OAuth configuration



