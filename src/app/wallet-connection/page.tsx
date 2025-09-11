"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WalletConnectModal from "../components/WalletConnectModal";
import EmailVerificationModal from "../components/EmailVerificationModal";

export default function WalletConnectionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showLinkWallet, setShowLinkWallet] = useState(false);
  const [showBackupWallet, setShowBackupWallet] = useState(false);
  const [showSecureLinking, setShowSecureLinking] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showCheckingEligibility, setShowCheckingEligibility] = useState(false);
  const [showEmailSuccess, setShowEmailSuccess] = useState(false);
  const [showWalletConnectModal, setShowWalletConnectModal] = useState(false);
  const [showBackupWalletConnectModal, setShowBackupWalletConnectModal] =
    useState(false);
  const [mainWalletAddress, setMainWalletAddress] = useState<string>("");
  const [backupWalletAddress, setBackupWalletAddress] = useState<string>("");
  const [currentWalletType, setCurrentWalletType] = useState<"main" | "backup">(
    "main"
  );

  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/"); // Redirect to home if not authenticated
      return;
    }
    // If authenticated, show the wallet connection modal
    setShowLinkWallet(true);
  }, [session, status, router]);

  const handleConnectMainWallet = () => {
    setCurrentWalletType("main");
    setShowWalletConnectModal(true);
  };

  const handleConnectBackupWallet = () => {
    setCurrentWalletType("backup");
    setShowBackupWalletConnectModal(true);
  };

  const handleMainWalletSuccess = (address: string) => {
    setMainWalletAddress(address);
    setShowLinkWallet(false);
    setShowBackupWallet(true);
  };

  const handleBackupWalletSuccess = (address: string) => {
    setBackupWalletAddress(address);
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
    setShowEmailSuccess(false);
    // Mark that the user has completed the full authentication flow
    localStorage.setItem("authFlowCompleted", "true");
    router.push("/");
  };

  // Auto-navigate after showing success for 3 seconds
  useEffect(() => {
    if (showEmailSuccess) {
      const timer = setTimeout(() => {
        handleContinue();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showEmailSuccess]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {/* Link Wallet Modal */}
      {showLinkWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Link Wallet
              </h2>
              <p className="text-gray-600 mb-6">
                Connect your Main wallet, this is the wallet you wish to secure
                its rewards
              </p>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <input
                  type="text"
                  placeholder={mainWalletAddress || "Connect your MAIN wallet"}
                  value={mainWalletAddress}
                  readOnly
                  className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleConnectMainWallet}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center space-x-2"
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
                  <span>
                    {mainWalletAddress ? "Change Wallet" : "Connect Wallet"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backup Wallet Modal */}
      {showBackupWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Link Wallet
              </h2>
              <p className="text-gray-600 mb-6">
                Connect your BACKUP wallet, if you don't have any we can
                generate create one{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  here
                </a>
              </p>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <input
                  type="text"
                  placeholder={
                    backupWalletAddress || "Connect your BACKUP wallet"
                  }
                  value={backupWalletAddress}
                  readOnly
                  className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleConnectBackupWallet}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center space-x-2"
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
                  <span>
                    {backupWalletAddress ? "Change Wallet" : "Connect Wallet"}
                  </span>
                </button>
              </div>

              <p className="text-sm text-gray-600">
                Backup wallets are used to collect rewards ensure to keep them
                safe. To manage your account properly we advise you create a{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Smart Account
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Secure Wallet Linking Modal */}
      {showSecureLinking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Secure Wallet Linking
              </h2>
              <p className="text-gray-600 mb-6">
                Sign transaction on your Main wallet and link it to your backup
                wallet
              </p>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-600 mr-3"
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
                    <span className="text-gray-800">Main Wallet</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {mainWalletAddress
                        ? `${mainWalletAddress.slice(
                            0,
                            6
                          )}...${mainWalletAddress.slice(-4)}`
                        : "Not connected"}
                    </span>
                    <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                      Disconnect
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-600 mr-3"
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
                    <span className="text-gray-800">Back-up Wallet</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {backupWalletAddress
                        ? `${backupWalletAddress.slice(
                            0,
                            6
                          )}...${backupWalletAddress.slice(-4)}`
                        : "Not connected"}
                    </span>
                    <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSecureLinking}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700"
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
        email={session?.user?.email || ""}
      />

      {/* Checking Eligibility Modal */}
      {showCheckingEligibility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Checking for eligibility
              </h2>
              <p className="text-gray-600 mb-6">
                Checking for wallet eligibility across protocols, this might
                take about <span className="font-bold">2 Mins</span>
              </p>

              <div className="w-32 h-32 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-green-600"
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

              <button className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-lg font-medium">
                Scanning...
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Success Modal */}
      {showEmailSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Email Verification
              </h2>
              <p className="text-lg text-gray-700 mb-2">🎉 You are all set!</p>
              <p className="text-gray-600 mb-6">
                Welcome to Restor3! Redirecting to your dashboard in a few
                seconds...
              </p>

              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-white"
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
                <div className="absolute inset-0 border-4 border-green-300 rounded-full animate-pulse"></div>
                <div
                  className="absolute inset-2 border-4 border-green-200 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="absolute inset-4 border-4 border-green-100 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-green-600"
              >
                Go to Dashboard Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Connect Modals */}
      <WalletConnectModal
        isOpen={showWalletConnectModal}
        onClose={() => setShowWalletConnectModal(false)}
        onSuccess={handleMainWalletSuccess}
        title="Connect Main Wallet"
        description="Connect your main wallet to secure its rewards"
        walletType="main"
      />

      <WalletConnectModal
        isOpen={showBackupWalletConnectModal}
        onClose={() => setShowBackupWalletConnectModal(false)}
        onSuccess={handleBackupWalletSuccess}
        title="Connect Backup Wallet"
        description="Connect your backup wallet to collect rewards"
        walletType="backup"
      />
    </div>
  );
}
