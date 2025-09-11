"use client";

import React, { useState } from "react";

interface WalletManagementPageProps {
  onNavigate?: (page: string) => void;
}

const WalletManagementPage: React.FC<WalletManagementPageProps> = ({
  onNavigate,
}) => {
  const [activeSection, setActiveSection] = useState("security");

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "security":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              {/* Connected Wallet */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Connected Wallet
                  </h3>
                  <p className="text-sm text-gray-500">0x508252d...c72</p>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                    Connect other accounts
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700">
                    Disconnect
                  </button>
                </div>
              </div>

              {/* Verify Ownership */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Verify Ownership
                  </h3>
                  <p className="text-sm text-gray-500">
                    This ensures that the connected wallet belongs to the
                    rightful owner
                  </p>
                </div>
                <span className="text-green-600 font-medium">
                  Ownership Verified
                </span>
              </div>

              {/* Recovery Mode */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Recovery Mode</h3>
                  <p className="text-sm text-gray-500">
                    This allows restor3 to claim rewards, this is ON by default
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    defaultChecked
                    disabled
                  />
                  <div className="w-12 h-6 bg-gray-300 rounded-full cursor-not-allowed">
                    <div className="w-6 h-6 bg-white rounded-full shadow transform translate-x-6 transition-transform"></div>
                  </div>
                </div>
              </div>

              {/* Export or Import Recovery Data */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Export or Import Recovery Data
                  </h3>
                  <p className="text-sm text-gray-500">
                    Recovery data contains wallet information
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Export / Import
                </button>
              </div>
            </div>
          </div>
        );

      case "claim-interaction":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Active Claims (3)
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm">
                See all claims
              </button>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        Oxymoron Protocol ($562)
                      </h3>
                      <p className="text-sm text-gray-500">
                        0x508252d...c79872
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Expiration Date</p>
                        <p className="font-medium text-gray-800">12/09/25</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Claim Date</p>
                        <p className="font-medium text-gray-800">-</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="border border-green-600 text-green-600 px-4 py-2 rounded-lg text-sm hover:bg-green-50">
                          Claim
                        </button>
                        <button className="border border-green-600 text-green-600 px-4 py-2 rounded-lg text-sm hover:bg-green-50">
                          Claim & Stake
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "activity-history":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Search and Filter Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <span>Sort</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Activity Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Wallet
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fees
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                    const statuses = [
                      "Successful",
                      "Successful",
                      "Unsuccessful",
                      "Successful",
                      "Pending",
                      "Successful",
                      "Successful",
                      "Successful",
                    ];
                    const status = statuses[index];
                    const statusColor =
                      status === "Successful"
                        ? "bg-green-100 text-green-800"
                        : status === "Unsuccessful"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800";

                    return (
                      <tr key={item} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          0x50d...872
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          08/09/25
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          Staking
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">-$298</div>
                          <div className="text-sm text-gray-500">0.04ETH</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">$0.2</div>
                          <div className="text-sm text-gray-500">
                            0.00004ETH
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "advanced-setting":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Advanced Settings
            </h2>

            <div className="space-y-6">
              {/* Gas Settings */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Gas Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Auto Gas Estimation
                    </span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        defaultChecked
                      />
                      <div className="w-12 h-6 bg-green-600 rounded-full cursor-pointer">
                        <div className="w-6 h-6 bg-white rounded-full shadow transform translate-x-6 transition-transform"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Custom Gas Limit
                    </span>
                    <input
                      type="number"
                      placeholder="21000"
                      className="px-3 py-1 border border-gray-300 rounded text-sm w-24"
                    />
                  </div>
                </div>
              </div>

              {/* Network Settings */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Network Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Default Network
                    </span>
                    <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                      <option>Ethereum Mainnet</option>
                      <option>Polygon</option>
                      <option>Arbitrum</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Auto Network Detection
                    </span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        defaultChecked
                      />
                      <div className="w-12 h-6 bg-green-600 rounded-full cursor-pointer">
                        <div className="w-6 h-6 bg-white rounded-full shadow transform translate-x-6 transition-transform"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Privacy Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Transaction History
                    </span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        defaultChecked
                      />
                      <div className="w-12 h-6 bg-green-600 rounded-full cursor-pointer">
                        <div className="w-6 h-6 bg-white rounded-full shadow transform translate-x-6 transition-transform"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Analytics Sharing
                    </span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-12 h-6 bg-gray-300 rounded-full cursor-pointer">
                        <div className="w-6 h-6 bg-white rounded-full shadow transition-transform"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
            Restor3
          </h1>
        </div>

        <nav className="mt-8">
          <div className="px-6">
            <div
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg mb-2 cursor-pointer"
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

            <div
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg mb-2 cursor-pointer"
              onClick={() => handleNavigation("defi")}
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span>DeFi</span>
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span className="text-gray-800 font-medium">
                Wallet Management
              </span>
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
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-end items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 12a2 2 0 114 0 2 2 0 01-4 0z" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">0x508252d...c79872</span>
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <span>Check wallet eligibility</span>
            </button>
          </div>
        </header>

        {/* Wallet Management Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Wallet Management
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Wallet Management Options */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-2">
                  <div
                    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                      activeSection === "security"
                        ? "bg-green-50 text-green-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveSection("security")}
                  >
                    <span className="font-medium">Security</span>
                    <svg
                      className={`w-5 h-5 ${
                        activeSection === "security"
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
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
                  </div>

                  <div
                    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                      activeSection === "claim-interaction"
                        ? "bg-green-50 text-green-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveSection("claim-interaction")}
                  >
                    <span className="font-medium">Claim & Interaction</span>
                    <svg
                      className={`w-5 h-5 ${
                        activeSection === "claim-interaction"
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
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
                  </div>

                  <div
                    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                      activeSection === "activity-history"
                        ? "bg-green-50 text-green-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveSection("activity-history")}
                  >
                    <span className="font-medium">Activity & History</span>
                    <svg
                      className={`w-5 h-5 ${
                        activeSection === "activity-history"
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
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
                  </div>

                  <div
                    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                      activeSection === "advanced-setting"
                        ? "bg-green-50 text-green-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveSection("advanced-setting")}
                  >
                    <span className="font-medium">Advanced Setting</span>
                    <svg
                      className={`w-5 h-5 ${
                        activeSection === "advanced-setting"
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
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
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Content */}
            <div className="lg:col-span-2">{renderSectionContent()}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WalletManagementPage;
