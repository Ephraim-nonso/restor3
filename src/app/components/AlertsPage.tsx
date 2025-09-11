"use client";

import React, { useState } from "react";

interface AlertsPageProps {
  onNavigate?: (page: string) => void;
}

const AlertsPage: React.FC<AlertsPageProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const notifications = [
    {
      id: 1,
      title: "Oxymoron airdrop claim",
      description:
        "Your airdrop claim of 354 OXY tokens is available, you have until 19/08/25 to claim it",
      isUnread: true,
      icon: "🎈",
    },
    {
      id: 2,
      title: "Oxymoron airdrop claim",
      description:
        "Your airdrop claim of 354 OXY tokens is available, you have until 19/08/25 to claim it",
      isUnread: true,
      icon: "🎈",
    },
    {
      id: 3,
      title: "Oxymoron airdrop claim",
      description:
        "Your airdrop claim of 354 OXY tokens is available, you have until 19/08/25 to claim it",
      isUnread: true,
      icon: "🎈",
    },
    {
      id: 4,
      title: "Oxymoron airdrop claim",
      description:
        "Your airdrop claim of 354 OXY tokens is available, you have until 19/08/25 to claim it",
      isUnread: false,
      icon: "🎈",
    },
    {
      id: 5,
      title: "Oxymoron airdrop claim",
      description:
        "Your airdrop claim of 354 OXY tokens is available, you have until 19/08/25 to claim it",
      isUnread: false,
      icon: "🎈",
    },
    {
      id: 6,
      title: "Oxymoron airdrop claim",
      description:
        "Your airdrop claim of 354 OXY tokens is available, you have until 19/08/25 to claim it",
      isUnread: false,
      icon: "🎈",
    },
    {
      id: 7,
      title: "Oxymoron airdrop claim",
      description:
        "Your airdrop claim of 354 OXY tokens is available, you have until 19/08/25 to claim it",
      isUnread: false,
      icon: "🎈",
    },
  ];

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const filteredNotifications =
    activeFilter === "all"
      ? notifications
      : activeFilter === "new"
      ? notifications.filter((n) => n.isUnread)
      : notifications.filter((n) => !n.isUnread);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white shadow-sm">
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

            <div className="flex items-center space-x-3 px-3 py-2 bg-green-50 rounded-lg">
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
                  d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v12a4 4 0 004 4h12a4 4 0 004-4V6a4 4 0 00-4-4H8a4 4 0 00-4 4v12a4 4 0 004 4h12"
                />
              </svg>
              <span className="text-gray-800 font-medium">Alerts</span>
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

        {/* Alerts Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Notifications
                </h1>
                <p className="text-gray-600">
                  You have ({unreadCount}) unread notifications
                </p>
              </div>
              <button className="text-green-600 hover:text-green-700 font-medium">
                Mark all as read
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === "all"
                    ? "bg-white text-green-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter("new")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === "new"
                    ? "bg-white text-green-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                New
              </button>
              <button
                onClick={() => setActiveFilter("unread")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === "unread"
                    ? "bg-white text-green-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Unread
              </button>
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="divide-y divide-gray-200">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-6 flex items-start space-x-4 ${
                      notification.isUnread ? "bg-green-50" : "bg-gray-50"
                    }`}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                          notification.isUnread ? "bg-green-100" : "bg-gray-200"
                        }`}
                      >
                        {notification.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {notification.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0 flex space-x-2">
                      {notification.isUnread && (
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                          Mark as read
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AlertsPage;
