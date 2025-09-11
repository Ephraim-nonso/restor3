"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Modal from "./Modal";
import {
  ClaimsModalContent,
  StakesModalContent,
  WalletModalContent,
  PoolsModalContent,
} from "./ModalContent";
import DeFiPage from "./DeFiPage";
import AlertsPage from "./AlertsPage";
import WalletManagementPage from "./WalletManagementPage";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("overview");
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "",
    title: "",
  });
  const router = useRouter();

  const handleLogout = async () => {
    // Clear the authentication flow completion flag
    localStorage.removeItem("authFlowCompleted");
    // Sign out from NextAuth
    await signOut({ callbackUrl: "/" });
  };

  const openModal = (type: string, title: string) => {
    setModalState({
      isOpen: true,
      type,
      title,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: "",
      title: "",
    });
  };

  const renderModalContent = () => {
    switch (modalState.type) {
      case "claims":
        return <ClaimsModalContent />;
      case "stakes":
        return <StakesModalContent />;
      case "wallet":
        return <WalletModalContent />;
      case "pools":
        return <PoolsModalContent />;
      default:
        return null;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "defi":
        return <DeFiPage onNavigate={setCurrentPage} />;
      case "alerts":
        return <AlertsPage onNavigate={setCurrentPage} />;
      case "wallet-management":
        return <WalletManagementPage onNavigate={setCurrentPage} />;
      default:
        return (
          <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-full lg:w-64 bg-white shadow-sm lg:shadow-sm">
              <div className="p-4 sm:p-6">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                  Restor3
                </h1>
              </div>

              <nav className="mt-4 sm:mt-8">
                <div className="px-4 sm:px-6">
                  <div
                    className={`flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 rounded-lg mb-1 sm:mb-2 cursor-pointer ${
                      currentPage === "overview"
                        ? "bg-green-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setCurrentPage("overview")}
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
                    <span
                      className={`text-sm sm:text-base ${
                        currentPage === "overview"
                          ? "text-gray-800 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      Overview
                    </span>
                  </div>

                  <div
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-2 cursor-pointer ${
                      currentPage === "defi"
                        ? "bg-green-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setCurrentPage("defi")}
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
                    <span
                      className={
                        currentPage === "defi"
                          ? "text-gray-800 font-medium"
                          : ""
                      }
                    >
                      DeFi
                    </span>
                  </div>

                  <div
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-2 cursor-pointer ${
                      currentPage === "wallet-management"
                        ? "bg-green-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setCurrentPage("wallet-management")}
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
                    <span
                      className={
                        currentPage === "wallet-management"
                          ? "text-gray-800 font-medium"
                          : ""
                      }
                    >
                      Wallet Management
                    </span>
                  </div>

                  <div
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer ${
                      currentPage === "alerts"
                        ? "bg-green-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setCurrentPage("alerts")}
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
                    <span
                      className={
                        currentPage === "alerts"
                          ? "text-gray-800 font-medium"
                          : ""
                      }
                    >
                      Alerts
                    </span>
                  </div>
                </div>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row justify-between sm:justify-end items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 12a2 2 0 114 0 2 2 0 01-4 0z" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">
                      0x508252d...c79872
                    </span>
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
                  <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 hover:bg-blue-700 text-xs sm:text-sm">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
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
                    <span className="hidden sm:inline">
                      Check wallet eligibility
                    </span>
                    <span className="sm:hidden">Check</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 hover:bg-red-700 text-xs sm:text-sm"
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </header>

              {/* Dashboard Content */}
              <main className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Total Claims Card */}
                  <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                      Total Claims
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Amount of claims made
                    </p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-green-600">
                        10
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        ($2,569889894329090490904r092)
                      </span>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() =>
                          openModal("claims", "Total number of claims")
                        }
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-700"
                      >
                        Pending claim (2)
                      </button>
                      <button
                        onClick={() => openModal("claims", "All Claims")}
                        className="w-full border border-green-600 text-green-600 py-2 px-4 rounded-lg text-sm hover:bg-green-50"
                      >
                        See all claims
                      </button>
                    </div>
                  </div>

                  {/* Active Protocol Stake Card */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Active Protocol Stake
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Cumulative stake on all accounts
                    </p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-800">
                        7
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        ($20,562)
                      </span>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() =>
                          openModal("stakes", "Active Protocol Stake")
                        }
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-purple-700"
                      >
                        View all stake
                      </button>
                      <button
                        onClick={() => openModal("pools", "Available Pools")}
                        className="w-full border border-purple-600 text-purple-600 py-2 px-4 rounded-lg text-sm hover:bg-purple-50"
                      >
                        See other pools
                      </button>
                    </div>
                  </div>

                  {/* Wallet Information Card */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Wallet Information
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Overview of connected accounts
                    </p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-blue-600">
                        1
                      </span>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-sm text-gray-600">
                          Connected Wallet
                        </span>
                        <svg
                          className="w-4 h-4 text-gray-400"
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
                      </div>
                      <p className="text-sm text-gray-500">0x508252d...c72</p>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() => openModal("wallet", "Connect Wallet")}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700"
                      >
                        Connect other accounts
                      </button>
                      <button
                        onClick={() => openModal("wallet", "Manage Accounts")}
                        className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg text-sm hover:bg-blue-50"
                      >
                        Manage accounts
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Pools Table */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Active Pools
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Pools
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center space-x-1">
                              <span>APY</span>
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
                                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                />
                              </svg>
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center space-x-1">
                              <span>TVL</span>
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
                                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                />
                              </svg>
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center space-x-1">
                              <span>Volume</span>
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
                                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                />
                              </svg>
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center space-x-1">
                              <span>Your Stake</span>
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
                                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                />
                              </svg>
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[1, 2, 3, 4].map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-3">
                                <div className="flex -space-x-2">
                                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                    <svg
                                      className="w-4 h-4 text-gray-600"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
                                    </svg>
                                  </div>
                                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg
                                      className="w-4 h-4 text-white"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
                                    </svg>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    WETH / LISK
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Earn: USDT
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Flexible
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              7.75 %
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              $1.25M
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              $1.25M
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {index === 0 || index === 3 ? "$51,000" : "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-gray-400 hover:text-gray-600">
                                <svg
                                  className="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </main>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {renderPage()}

      {/* Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default Dashboard;
