"use client";

import React, { useState } from "react";
import WalletOverview from "../components/WalletOverview";
import DeFiDetails from "../components/DeFiDetails";

const TestDebankPage: React.FC = () => {
  const [address, setAddress] = useState(
    "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
  ); // Vitalik's address for testing
  const [currentView, setCurrentView] = useState<"overview" | "details">(
    "overview"
  );

  const handleViewDetails = () => {
    setCurrentView("details");
  };

  const handleBackToOverview = () => {
    setCurrentView("overview");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Debank Integration Test
          </h1>
          <p className="text-gray-600">
            Test the Debank API integration with real wallet data
          </p>
        </div>

        {/* Address Input */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <label
            htmlFor="test-address"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Test Wallet Address
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="test-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter wallet address (0x...)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => {
                if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
                  setCurrentView("overview");
                } else {
                  alert("Please enter a valid Ethereum address");
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Analyze
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Try with: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 (Vitalik's
            address)
          </div>
        </div>

        {/* View Toggle */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setCurrentView("overview")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === "overview"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setCurrentView("details")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === "details"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              DeFi Details
            </button>
          </div>
        </div>

        {/* Debank Components */}
        {currentView === "overview" ? (
          <WalletOverview address={address} onViewDetails={handleViewDetails} />
        ) : (
          <DeFiDetails address={address} onBack={handleBackToOverview} />
        )}

        {/* API Status */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            API Status
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Debank API Client: Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Overview API: /api/debank/overview</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>DeFi Details API: /api/debank/defi-details</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Note: Requires Debank API key for production</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDebankPage;



