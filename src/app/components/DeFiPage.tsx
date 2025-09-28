"use client";

import React, { useState, useEffect } from "react";
import { useWallet } from "../contexts/WalletContext";
import WalletOverview from "./WalletOverview";
import DeFiDetails from "./DeFiDetails";

interface DeFiPageProps {
  onNavigate?: (page: string) => void;
}

const DeFiPage: React.FC<DeFiPageProps> = ({ onNavigate }) => {
  const [currentView, setCurrentView] = useState<"overview" | "details">(
    "overview"
  );
  const { mainWalletAddress, backupWalletAddress } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<"main" | "backup">(
    "main"
  );

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleViewDetails = () => {
    setCurrentView("details");
  };

  const handleBackToOverview = () => {
    setCurrentView("overview");
  };

  // Get the current wallet address based on selection
  const getCurrentWalletAddress = () => {
    if (selectedWallet === "main") {
      return mainWalletAddress;
    }
    return backupWalletAddress;
  };

  // Auto-select main wallet if available, otherwise backup
  useEffect(() => {
    if (mainWalletAddress) {
      setSelectedWallet("main");
    } else if (backupWalletAddress) {
      setSelectedWallet("backup");
    }
  }, [mainWalletAddress, backupWalletAddress]);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white shadow-sm">
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
            Restor3
          </h1>
        </div>

        <nav className="mt-4 sm:mt-8">
          <div className="px-4 sm:px-6">
            <div
              className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg mb-1 sm:mb-2 cursor-pointer"
              onClick={() => handleNavigation("overview")}
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Overview</span>
            </div>

            <div className="flex items-center space-x-3 px-3 py-2 bg-green-50 rounded-lg mb-2">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span className="text-gray-800 font-medium">DeFi</span>
            </div>

            <div
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg mb-2 cursor-pointer"
              onClick={() => handleNavigation("wallet-management")}
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
              <span>Wallet Management</span>
            </div>

            <div
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => handleNavigation("alerts")}
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
                  d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v12a4 4 0 004 4h12a4 4 0 004-4V6a4 4 0 00-4-4H8a4 4 0 00-4 4v12a4 4 0 004 4h12"
                />
              </svg>
              <span>Alerts</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Wallet Selection Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Wallet Selection */}
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Select Wallet:
              </h2>
              <div className="flex space-x-2">
                {mainWalletAddress && (
                  <button
                    onClick={() => setSelectedWallet("main")}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedWallet === "main"
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Main Wallet
                  </button>
                )}
                {backupWalletAddress && (
                  <button
                    onClick={() => setSelectedWallet("backup")}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedWallet === "backup"
                        ? "bg-blue-100 text-blue-800 border border-blue-300"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Backup Wallet
                  </button>
                )}
              </div>
            </div>

            {/* Current Wallet Address */}
            {getCurrentWalletAddress() && (
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    selectedWallet === "main" ? "bg-green-500" : "bg-blue-500"
                  }`}
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 12a2 2 0 114 0 2 2 0 01-4 0z" />
                  </svg>
                </div>
                <span className="text-sm font-mono text-gray-900">
                  {getCurrentWalletAddress()?.slice(0, 6)}...
                  {getCurrentWalletAddress()?.slice(-4)}
                </span>
              </div>
            )}

            {/* No Wallet Connected */}
            {!mainWalletAddress && !backupWalletAddress && (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-500">
                  No wallets connected
                </span>
              </div>
            )}
          </div>
        </div>

        {/* DeFi Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              DeFi Dashboard
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage your decentralized finance activities and track your
              portfolio
            </p>
          </div>

          {/* Debank Components */}
          {getCurrentWalletAddress() && getCurrentWalletAddress().length > 0 ? (
            currentView === "overview" ? (
              <WalletOverview
                address={getCurrentWalletAddress()!}
                onViewDetails={handleViewDetails}
              />
            ) : (
              <DeFiDetails
                address={getCurrentWalletAddress()!}
                onBack={handleBackToOverview}
              />
            )
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Wallet Connected
              </h3>
              <p className="text-gray-600 mb-4">
                Please connect your main and backup wallets to view DeFi data.
              </p>
              <button
                onClick={() => onNavigate?.("wallet-management")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Connect Wallets
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DeFiPage;
