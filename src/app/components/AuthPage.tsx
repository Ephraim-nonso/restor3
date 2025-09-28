"use client";

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import EmailVerificationModal from "./EmailVerificationModal";
interface AuthPageProps {
  onAuthSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [currentStep, setCurrentStep] = useState("welcome");
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const [showLinkWallet, setShowLinkWallet] = useState(false);
  const [showBackupWallet, setShowBackupWallet] = useState(false);
  const [showSecureLinking, setShowSecureLinking] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showCheckingEligibility, setShowCheckingEligibility] = useState(false);
  const [showEmailSuccess, setShowEmailSuccess] = useState(false);

  // Add the useAuth hook
  const { session, isLoading, isAuthenticated, user, handleGoogleSignIn } =
    useAuth();

  // Replace the dummy handleGoogleSignIn with this one that calls the real auth
  const handleGoogleSignInClick = async () => {
    await handleGoogleSignIn();
  };

  const handleGoogleAccountSelect = () => {
    setShowGoogleSignIn(false);
    setShowLinkWallet(true);
  };

  const handleLinkMainWallet = () => {
    setShowLinkWallet(false);
    setShowBackupWallet(true);
  };

  const handleLinkBackupWallet = () => {
    setShowBackupWallet(false);
    setShowSecureLinking(true);
  };

  const handleSecureLinking = () => {
    setShowSecureLinking(false);
    setShowEmailVerification(true);
  };

  const handleEmailVerification = () => {
    setShowEmailVerification(false);
    setShowCheckingEligibility(true);

    // Simulate checking eligibility
    setTimeout(() => {
      setShowCheckingEligibility(false);
      setShowEmailSuccess(true);
    }, 3000);
  };

  const handleContinue = () => {
    // Back button handler for returning to auth page
    const handleBackToAuth = () => {
      setShowGoogleSignIn(false);
      setShowLinkWallet(false);
      setShowBackupWallet(false);
      setShowSecureLinking(false);
      setShowEmailVerification(false);
      setShowCheckingEligibility(false);
      setShowEmailSuccess(false);
    };
    setShowEmailSuccess(false);
    onAuthSuccess();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Sidebar */}
      <div
        className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex-shrink-0"
        style={{
          backgroundImage: "url('/bg-rectangle.svg')",
          backgroundSize: "200% 100%",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex items-center justify-center lg:justify-start h-full min-h-[300px] lg:min-h-screen">
          <div className="text-center lg:text-left">
            {/* Welcome to Restor3 */}
            <div className="mb-6 lg:mb-8">
              <h1
                className="text-lg sm:text-xl md:text-2xl font-bold mb-2"
                style={{
                  color: "rgba(170, 170, 170, 1)",
                }}
              >
                Welcome to
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-yellow-300 to-green-700 bg-clip-text text-transparent">
                Restor3
              </h1>
            </div>

            {/* Yellow Card */}
            <div
              className="flex flex-col sm:flex-row bg-yellow-300 rounded-lg p-4 sm:p-6 lg:p-8 mx-auto lg:mx-0"
              style={{
                width: "100%",
                maxWidth: "346px",
                minHeight: "189px",
              }}
            >
              <div className="flex-1 mb-4 sm:mb-0 sm:mr-4">
                <div className="text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    Secure your investment
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 mb-4">
                    Stay ahead
                  </p>
                  <button className="text-black px-4 py-2 rounded-lg font-medium bg-white hover:bg-gray-100 transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
              <div className="flex justify-center sm:justify-end">
                <img
                  src="/phone.svg"
                  alt="Phone"
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div
        className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-center min-h-[400px] lg:min-h-screen"
        style={{
          backgroundImage: "url('/bg-rectangle.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="max-w-md mx-auto w-full rounded-2xl px-6 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2 text-center lg:text-left">
            Get Started
          </h2>
          <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base text-center lg:text-left">
            A smart way to manage your crypto assets and can also help you earn
            more rewards.
          </p>

          <div className="space-y-4">
            <div
              className="rounded-xl p-3 sm:p-4"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <input
                  type="text"
                  placeholder="Enter wallet address"
                  className="flex-1 text-white px-3 sm:px-4 py-3 sm:py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base placeholder-gray-400"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                />
                <button
                  className="text-white px-4 py-3 sm:p-2 rounded-lg hover:opacity-80 flex items-center justify-center sm:justify-start transition-opacity min-h-[44px] sm:min-h-auto"
                  style={{
                    background: "rgba(34, 197, 94, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                    boxShadow: "0 4px 16px rgba(34, 197, 94, 0.2)",
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="text-center my-6 sm:my-8">
              <div className="flex items-center justify-center mb-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <p className="text-gray-400 text-sm px-4">other options</p>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-8">
                <button
                  onClick={handleGoogleSignInClick}
                  className="text-gray-800 cursor-pointer py-3 px-6 sm:px-4 lg:px-6 rounded-xl font-medium hover:opacity-80 flex items-center justify-center space-x-2 text-sm sm:text-base transition-opacity w-full sm:w-auto min-h-[44px]"
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleGoogleSignInClick}
                  className="text-gray-800 cursor-pointer py-3 px-6 sm:px-4 lg:px-6 rounded-xl font-medium hover:opacity-80 flex items-center justify-center space-x-2 text-sm sm:text-base transition-opacity w-full sm:w-auto min-h-[44px]"
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="text-center text-gray-400 text-xs sm:text-sm">
              <p className="leading-relaxed">
                Going ahead with this action signifies that you have accepted
                our{" "}
                <a
                  href="#"
                  className="text-orange-500 hover:text-orange-400 underline"
                >
                  Terms and Conditions,{" "}
                </a>
                alongside{" "}
                <a
                  href="#"
                  className="text-orange-500 hover:text-orange-400 underline"
                >
                  our privacy and legal obligations.
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* <button className="absolute top-8 right-8 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
          Skip for now
        </button> */}
      </div>

      {/* Google Sign In Modal */}
      {showGoogleSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Sign in with Google
                  </h2>
                </div>
              </div>

              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base text-center">
                Choose an account you would love to continue with
              </p>

              <div className="space-y-3 mb-4 sm:mb-6">
                <div
                  className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors min-h-[60px]"
                  onClick={handleGoogleAccountSelect}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <span className="text-white font-medium text-sm sm:text-base">
                      AS
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
                      Adebayo Solomon
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                      Adebayosolomon74@gmail.com
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors min-h-[60px]"
                  onClick={handleGoogleAccountSelect}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <span className="text-white font-medium text-sm sm:text-base">
                      AS
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
                      Adebayo Solomon
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                      Oxprank@gmail.com
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors min-h-[60px]"
                  onClick={handleGoogleAccountSelect}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <span className="text-white font-medium text-sm sm:text-base">
                      AS
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
                      Adebayo Solomon
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                      OxKode@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 text-center">
                You can check through Restor3{" "}
                <a href="#" className="text-orange-500 hover:text-orange-400">
                  privacy and legal obligations
                </a>{" "}
                here before going through with this action.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Link Wallet Modal */}
      {showLinkWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">
                Link Wallet
              </h2>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base text-center">
                Connect your Main wallet, this is the wallet you wish to secure
                its rewards
              </p>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4 sm:mb-6">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>

              <div className="flex flex-col space-y-3 mb-4 sm:mb-6">
                <input
                  type="text"
                  placeholder="Connect your MAIN wallet"
                  className="w-full bg-gray-100 text-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                />
                <button
                  onClick={handleLinkMainWallet}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2 text-sm sm:text-base min-h-[44px]"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <span>Connect Wallet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backup Wallet Modal */}
      {showBackupWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">
                Link Wallet
              </h2>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base text-center">
                Connect your BACKUP wallet, if you don't have any we can
                generate create one{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-500 underline"
                >
                  here
                </a>
              </p>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4 sm:mb-6">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>

              <div className="flex flex-col space-y-3 mb-4 sm:mb-6">
                <input
                  type="text"
                  placeholder="Connect your BACKUP wallet"
                  className="w-full bg-gray-100 text-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                />
                <button
                  onClick={handleLinkBackupWallet}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2 text-sm sm:text-base min-h-[44px]"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <span>Connect Wallet</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
                Backup wallets are used to collect rewards ensure to keep them
                safe. To manage your account properly we advise you create a{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-500 underline"
                >
                  Smart Account
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Secure Wallet Linking Modal */}
      {showSecureLinking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">
                Secure Wallet Linking
              </h2>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base text-center">
                Sign transaction on your Main wallet and link it to your backup
                wallet
              </p>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4 sm:mb-6">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>

              <div className="space-y-3 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-gray-200 rounded-lg space-y-2 sm:space-y-0">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    <span className="text-gray-800 text-sm sm:text-base">
                      Main Wallet
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <span className="text-xs sm:text-sm text-gray-500 break-all sm:break-normal">
                      0x508252d...c72
                    </span>
                    <button className="bg-red-600 text-white px-3 py-2 rounded text-xs sm:text-sm hover:bg-red-700 min-h-[32px]">
                      Disconnect
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-gray-200 rounded-lg space-y-2 sm:space-y-0">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    <span className="text-gray-800 text-sm sm:text-base">
                      Back-up Wallet
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <span className="text-xs sm:text-sm text-gray-500 break-all sm:break-normal">
                      0x508252d...c72
                    </span>
                    <button className="bg-red-600 text-white px-3 py-2 rounded text-xs sm:text-sm hover:bg-red-700 min-h-[32px]">
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSecureLinking}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 min-h-[44px]"
              >
                Link Wallet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showEmailVerification}
        onClose={() => setShowEmailVerification(false)}
        onSuccess={handleEmailVerification}
        email="adebayosolomon74@gmail.com"
      />

      {/* Checking Eligibility Modal */}
      {showCheckingEligibility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 text-center">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Checking for eligibility
              </h2>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Checking for wallet eligibility across protocols, this might
                take about <span className="font-bold">2 Mins</span>
              </p>

              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                  />
                </svg>
              </div>

              <button className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-lg font-medium min-h-[44px]">
                Scanning...
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Success Modal */}
      {showEmailSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 text-center">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Email Verification
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-2">
                You are all set
              </p>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Let's jump right in and discover the unlimited possibilities
                that awaits you.
              </p>

              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 relative">
                <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 border-2 sm:border-4 border-green-300 rounded-full animate-pulse"></div>
                <div
                  className="absolute inset-1 sm:inset-2 border-2 sm:border-4 border-green-200 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="absolute inset-2 sm:inset-4 border-2 sm:border-4 border-green-100 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-green-600 min-h-[44px]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
