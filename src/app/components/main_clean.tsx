"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { useWallet } from "../contexts/WalletContext";
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
  const { mainWalletAddress, backupWalletAddress } = useWallet();
  const router = useRouter();

  const copyToClipboard = async (text: string, walletType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${walletType} wallet address copied to clipboard!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      toast.error("Failed to copy address", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleLogout = async () => {
    // Clear the authentication flow completion flag
    localStorage.removeItem("authFlowCompleted");
    localStorage.removeItem("mainWalletAddress");
    localStorage.removeItem("backupWalletAddress");

    await signOut({ redirect: false });
    router.push("/");
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
                          : "text-gray-600"
                      }
                    >
                      DeFi
                    </span>
                  </div>

                  <div
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-2 cursor-pointer ${
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
                        d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L16 7l-6 6-6-6z"
                      />
                    </svg>
                    <span
                      className={
                        currentPage === "alerts"
                          ? "text-gray-800 font-medium"
                          : "text-gray-600"
                      }
                    >
                      Alerts
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span
                      className={
                        currentPage === "wallet-management"
                          ? "text-gray-800 font-medium"
                          : "text-gray-600"
                      }
                    >
                      Wallet Management
                    </span>
                  </div>
                </div>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-3 lg:space-y-0 lg:space-x-6">
                  {/* Wallet Addresses Section */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    {/* Main Wallet */}
                    {mainWalletAddress && (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 12a2 2 0 114 0 2 2 0 01-4 0z" />
                          </svg>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                          <span className="text-xs text-gray-500">Main:</span>
                          <span className="text-xs sm:text-sm text-gray-600 font-mono">
                            {mainWalletAddress.slice(0, 6)}...
                            {mainWalletAddress.slice(-4)}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(mainWalletAddress, "Main")
                            }
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
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
                      </div>
                    )}

                    {/* Backup Wallet */}
                    {backupWalletAddress && (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 12a2 2 0 114 0 2 2 0 01-4 0z" />
                          </svg>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                          <span className="text-xs text-gray-500">Backup:</span>
                          <span className="text-xs sm:text-sm text-gray-600 font-mono">
                            {backupWalletAddress.slice(0, 6)}...
                            {backupWalletAddress.slice(-4)}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(backupWalletAddress, "Backup")
                            }
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
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
                      </div>
                    )}

                    {/* No Wallets Connected */}
                    {!mainWalletAddress && !backupWalletAddress && (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
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
                        <span className="text-xs sm:text-sm text-gray-500">
                          No wallets connected
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 hover:bg-blue-700 text-xs sm:text-sm transition-colors">
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
                      className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 hover:bg-red-700 text-xs sm:text-sm transition-colors"
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
                        ($2,569.89)
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
                      Currently staked protocols
                    </p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-blue-600">
                        5
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        protocols
                      </span>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() => openModal("stakes", "Active Stakes")}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700"
                      >
                        View Stakes
                      </button>
                      <button
                        onClick={() => openModal("stakes", "All Stakes")}
                        className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg text-sm hover:bg-blue-50"
                      >
                        Manage Stakes
                      </button>
                    </div>
                  </div>

                  {/* Wallet Management Card */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Wallet Management
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Manage your wallets
                    </p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-purple-600">
                        2
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        wallets
                      </span>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() => openModal("wallet", "Wallet Management")}
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-purple-700"
                      >
                        Manage Wallets
                      </button>
                      <button
                        onClick={() => setCurrentPage("wallet-management")}
                        className="w-full border border-purple-600 text-purple-600 py-2 px-4 rounded-lg text-sm hover:bg-purple-50"
                      >
                        Advanced Settings
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Claim processed
                          </p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        +$150.00
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Stake updated
                          </p>
                          <p className="text-xs text-gray-500">5 hours ago</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-blue-600">
                        Uniswap V3
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-purple-600"
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
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Wallet connected
                          </p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-purple-600">
                        Main Wallet
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                      onClick={() => openModal("pools", "Liquidity Pools")}
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <svg
                          className="w-4 h-4 text-blue-600"
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
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        Liquidity Pools
                      </span>
                    </button>

                    <button
                      onClick={() => openModal("claims", "Claim Rewards")}
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        Claim Rewards
                      </span>
                    </button>

                    <button
                      onClick={() => openModal("stakes", "Stake Tokens")}
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                        <svg
                          className="w-4 h-4 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        Stake Tokens
                      </span>
                    </button>

                    <button
                      onClick={() => setCurrentPage("wallet-management")}
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                        <svg
                          className="w-4 h-4 text-orange-600"
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
                      <span className="text-sm font-medium text-gray-900">
                        Wallet Settings
                      </span>
                    </button>
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



