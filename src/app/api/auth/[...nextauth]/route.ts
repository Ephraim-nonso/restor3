import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "@/lib/apple-provider"; // Requires Apple Developer Program

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_CLIENT_ID!,
    //   clientSecret: process.env.APPLE_CLIENT_SECRET!,
    // }), // Requires Apple Developer Program ($99/year)
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // You can add custom logic here if needed
      return true;
    },
    async session({ session, token }) {
      // You can add custom session data here
      return session;
    },
    async redirect({ url, baseUrl }) {
      // After successful authentication, redirect to wallet connection page
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/wallet-connection`;
    },
  },
  pages: {
    signIn: "/auth", // Custom sign-in page
  },
  // Add these configurations for development
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});

export { handler as GET, handler as POST };
