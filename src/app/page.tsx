"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Dashboard from "./components/main";
import AuthPage from "./components/AuthPage";

export default function Home() {
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user has completed the full authentication flow (Google OAuth + Wallet Connection + Email Verification)
  useEffect(() => {
    // Check if user has a session AND has completed wallet connection
    // For now, we'll use session as the indicator, but in a real app you'd check a database
    if (session) {
      // Check if user has completed the full flow (you could store this in a database)
      const hasCompletedFlow = localStorage.getItem("authFlowCompleted");
      if (hasCompletedFlow) {
        setIsAuthenticated(true);
      }
    }
  }, [session]);

  const handleAuthSuccess = () => {
    // Mark that the user has completed the full authentication flow
    localStorage.setItem("authFlowCompleted", "true");
    setIsAuthenticated(true);
  };

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // If user has completed the full authentication flow, show dashboard
  if (isAuthenticated) {
    return <Dashboard />;
  }

  // If not authenticated, show auth page
  return <AuthPage onAuthSuccess={handleAuthSuccess} />;
}
