"use client";

import React, { useState, useEffect, useRef } from "react";
import { useEmailVerification } from "../hooks/useEmailVerification";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  email: string;
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  email,
}) => {
  const [code, setCode] = useState<string[]>(new Array(5).fill(""));
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    isLoading,
    timeLeft,
    isCodeExpired,
    canResend,
    attempts,
    maxAttempts,
    formatTime,
    verifyCode,
    resendCode,
    resetVerification,
  } = useEmailVerification({
    email,
    onVerificationSuccess: () => {
      setSuccess(true);
      setError("");
      setTimeout(() => {
        onSuccess();
      }, 2000); // Increased to 2 seconds for better UX
    },
    onVerificationError: (errorMessage) => {
      setError(errorMessage);
      setCode(new Array(5).fill(""));
      // Focus on first input
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    },
  });

  // Handle input change
  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if value is entered
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every((digit) => digit !== "") && !isLoading) {
      handleSubmit(newCode.join(""));
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 5);
    const newCode = new Array(5).fill("");

    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }

    setCode(newCode);

    // Focus on the next empty field or the last field
    const nextEmptyIndex = newCode.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex === -1 ? 4 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  // Handle form submission
  const handleSubmit = async (codeToVerify?: string) => {
    const codeToCheck = codeToVerify || code.join("");
    if (codeToCheck.length !== 5) {
      setError("Please enter a complete 5-digit code");
      return;
    }

    setError("");
    await verifyCode(codeToCheck);
  };

  // Handle resend
  const handleResend = async () => {
    setError("");
    setCode(new Array(5).fill(""));
    await resendCode();
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCode(new Array(5).fill(""));
      setError("");
      setSuccess(false);
    } else {
      // Reset verification state when modal is closed
      resetVerification();
    }
  }, [isOpen, resetVerification]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Email Verification
          </h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Enter the code sent to your email address below.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 break-all">
            {email}
          </p>

          {/* Code Input Fields */}
          <div className="flex space-x-1 sm:space-x-2 mb-4 sm:mb-6 justify-center">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-10 h-10 sm:w-12 sm:h-12 text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-base sm:text-lg font-semibold ${
                  error
                    ? "border-red-500 bg-red-50"
                    : success
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
                disabled={isLoading || success}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">
                ✅ Verification successful! Redirecting to dashboard...
              </p>
            </div>
          )}

          {/* Timer and Resend */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-600">
              Didn't get the code?{" "}
              <button
                onClick={handleResend}
                disabled={!canResend || isLoading}
                className={`text-orange-500 hover:text-orange-400 ${
                  !canResend || isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Resend
              </button>
            </span>
            <span
              className={`text-sm ${
                isCodeExpired ? "text-red-600" : "text-green-600"
              }`}
            >
              {isCodeExpired
                ? "Code expired"
                : `Try after ${formatTime(timeLeft)}`}
            </span>
          </div>

          {/* Attempts Counter */}
          {attempts > 0 && (
            <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-700">
                {attempts}/{maxAttempts} attempts used
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={() => handleSubmit()}
            disabled={
              isLoading || success || code.some((digit) => digit === "")
            }
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Verifying...
              </>
            ) : success ? (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Verified!
              </>
            ) : (
              "Submit"
            )}
          </button>

          {/* Development Helper */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-2 bg-gray-100 rounded text-xs text-gray-600">
              <p>Dev: Check console for verification code</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
