"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseEmailVerificationProps {
  email: string;
  onVerificationSuccess: () => void;
  onVerificationError: (error: string) => void;
}

export const useEmailVerification = ({
  email,
  onVerificationSuccess,
  onVerificationError,
}: UseEmailVerificationProps) => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute countdown
  const [isCodeExpired, setIsCodeExpired] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(3);
  const isInitialized = useRef(false);

  // Generate a random 5-digit verification code
  const generateVerificationCode = useCallback(() => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }, []);

  // Send verification code to email
  const sendVerificationCode = useCallback(async () => {
    setIsLoading(true);
    try {
      const code = generateVerificationCode();

      // Send verification email via API
      const response = await fetch("/api/send-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send verification email");
      }

      // For development, also log to console
      if (process.env.NODE_ENV === "development") {
        console.log(`Verification code for ${email}: ${code}`);
      }

      setVerificationCode(code);
      setTimeLeft(60);
      setIsCodeExpired(false);
      setCanResend(false);
      setAttempts(0);

      return { success: true, code };
    } catch (error) {
      console.error("Email sending error:", error);
      onVerificationError(
        "Failed to send verification code. Please try again."
      );
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, [email, generateVerificationCode, onVerificationError]);

  // Verify the entered code
  const verifyCode = useCallback(
    async (enteredCode: string) => {
      if (isCodeExpired) {
        onVerificationError(
          "Verification code has expired. Please request a new one."
        );
        return false;
      }

      if (attempts >= maxAttempts) {
        onVerificationError(
          "Too many failed attempts. Please request a new code."
        );
        return false;
      }

      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (enteredCode === verificationCode) {
          onVerificationSuccess();
          return true;
        } else {
          setAttempts((prev) => prev + 1);
          onVerificationError(
            `Invalid code. ${maxAttempts - attempts - 1} attempts remaining.`
          );
          return false;
        }
      } catch (error) {
        onVerificationError("Verification failed. Please try again.");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [
      verificationCode,
      isCodeExpired,
      attempts,
      maxAttempts,
      onVerificationSuccess,
      onVerificationError,
    ]
  );

  // Resend verification code
  const resendCode = useCallback(async () => {
    if (!canResend) return;

    const result = await sendVerificationCode();
    return result.success;
  }, [canResend, sendVerificationCode]);

  // Reset the hook state (useful when modal is closed and reopened)
  const resetVerification = useCallback(() => {
    setVerificationCode("");
    setTimeLeft(60);
    setIsCodeExpired(false);
    setCanResend(false);
    setAttempts(0);
    isInitialized.current = false;
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isCodeExpired) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isCodeExpired) {
      setIsCodeExpired(true);
      setCanResend(true);
    }
  }, [timeLeft, isCodeExpired]);

  // Format time for display
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  // Initialize verification code on mount
  useEffect(() => {
    if (email && !isInitialized.current) {
      isInitialized.current = true;
      sendVerificationCode();
    }
  }, [email, sendVerificationCode]);

  return {
    verificationCode,
    isLoading,
    timeLeft,
    isCodeExpired,
    canResend,
    attempts,
    maxAttempts,
    formatTime,
    sendVerificationCode,
    verifyCode,
    resendCode,
    resetVerification,
  };
};
