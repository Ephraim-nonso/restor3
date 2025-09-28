#!/bin/bash

# Restor3 Deployment Script
# This script helps deploy to both restor3.io and restor3.vercel.app

echo "🚀 Starting Restor3 deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel:"
    vercel login
fi

# Build the project
echo "📦 Building project..."
yarn build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Deploy to production
echo "🌐 Deploying to production..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo ""
    echo "🌍 Your app is now available at:"
    echo "   • https://restor3.io (custom domain)"
    echo "   • https://restor3.vercel.app (Vercel subdomain)"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Verify both domains are working"
    echo "   2. Test Google OAuth on both domains"
    echo "   3. Test wallet connection functionality"
    echo "   4. Check SSL certificates are active"
else
    echo "❌ Deployment failed. Please check the errors above."
    exit 1
fi



