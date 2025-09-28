"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export const useAuth = () => {
  const { data: session, status } = useSession();

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/wallet-connection", // Redirect to wallet connection page
        redirect: true,
      });
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await signIn("apple", {
        callbackUrl: "/wallet-connection", // Redirect to wallet connection page
        redirect: true,
      });
    } catch (error) {
      console.error("Apple sign in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return {
    session,
    status,
    isLoading: status === "loading",
    isAuthenticated: !!session,
    user: session?.user,
    handleGoogleSignIn,
    handleAppleSignIn,
    handleSignOut,
  };
};
