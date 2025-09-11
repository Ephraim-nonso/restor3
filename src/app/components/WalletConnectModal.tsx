"use client";

import React, { useState } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import {
  injected,
  metaMask,
  walletConnect,
  coinbaseWallet,
} from "wagmi/connectors";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (address: string) => void;
  title: string;
  description: string;
  walletType: "main" | "backup";
}

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title,
  description,
  walletType,
}) => {
  const { connect, connectors, isPending } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [selectedConnector, setSelectedConnector] = useState<any>(null);

  const handleConnect = async (connector: any) => {
    try {
      setSelectedConnector(connector);
      await connect({ connector });
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const handleSuccess = () => {
    if (address) {
      onSuccess(address);
      onClose();
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setSelectedConnector(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
          <p className="text-gray-600 mb-6">{description}</p>

          {!isConnected ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 mb-4">
                Choose a wallet to connect:
              </p>

              {/* MetaMask */}
              <button
                onClick={() => handleConnect(metaMask())}
                disabled={isPending}
                className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">MetaMask</p>
                  <p className="text-sm text-gray-500">
                    Connect using MetaMask
                  </p>
                </div>
              </button>

              {/* WalletConnect */}
              <button
                onClick={() =>
                  handleConnect(
                    walletConnect({
                      projectId:
                        process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
                    })
                  )
                }
                disabled={isPending}
                className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">W</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">WalletConnect</p>
                  <p className="text-sm text-gray-500">
                    Connect using WalletConnect
                  </p>
                </div>
              </button>

              {/* Coinbase Wallet */}
              <button
                onClick={() =>
                  handleConnect(coinbaseWallet({ appName: "Restor3" }))
                }
                disabled={isPending}
                className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">C</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">Coinbase Wallet</p>
                  <p className="text-sm text-gray-500">
                    Connect using Coinbase Wallet
                  </p>
                </div>
              </button>

              {/* Injected (Generic) */}
              <button
                onClick={() => handleConnect(injected())}
                disabled={isPending}
                className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">I</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">Browser Wallet</p>
                  <p className="text-sm text-gray-500">
                    Connect using browser wallet
                  </p>
                </div>
              </button>

              {isPending && (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                  <p className="text-sm text-gray-500 mt-2">Connecting...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-800">
                      Wallet Connected!
                    </p>
                    <p className="text-sm text-green-600">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </p>
                  </div>
                  <button
                    onClick={handleDisconnect}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleSuccess}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700"
                >
                  Continue with {walletType === "main" ? "Main" : "Backup"}{" "}
                  Wallet
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletConnectModal;
