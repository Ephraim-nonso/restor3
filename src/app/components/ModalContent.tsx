"use client";

import React from "react";

// Claims Modal Content
export const ClaimsModalContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-gray-800">3</div>
        <div className="text-sm text-gray-500">($2,562)</div>
      </div>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">Oxymoron Protocol</h3>
            <span className="text-sm text-gray-600">$562</span>
          </div>
          <p className="text-sm text-gray-500 mb-3">0x508252d...c79872</p>
          <div className="flex space-x-2">
            <button className="flex-1 border border-green-600 text-green-600 py-2 px-3 rounded-lg text-sm hover:bg-green-50">
              Claim
            </button>
            <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-700">
              Claim & Stake
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">Anvil Protocol</h3>
            <span className="text-sm text-gray-600">$1,362</span>
          </div>
          <p className="text-sm text-gray-500 mb-3">0x508252d...c79872</p>
          <div className="flex space-x-2">
            <button className="flex-1 border border-green-600 text-green-600 py-2 px-3 rounded-lg text-sm hover:bg-green-50">
              Claim
            </button>
            <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-700">
              Claim & Stake
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">Franvol Protocol</h3>
            <span className="text-sm text-gray-600">$700</span>
          </div>
          <p className="text-sm text-gray-500 mb-3">0x508252d...c79872</p>
          <div className="flex space-x-2">
            <button className="flex-1 border border-green-600 text-green-600 py-2 px-3 rounded-lg text-sm hover:bg-green-50">
              Claim
            </button>
            <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-700">
              Claim & Stake
            </button>
          </div>
        </div>
      </div>

      <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700">
        Claim all rewards (3)
      </button>
    </div>
  );
};

// Stakes Modal Content
export const StakesModalContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-gray-800">7</div>
        <div className="text-sm text-gray-500">($20,562)</div>
      </div>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">WETH / LISK Pool</h3>
            <span className="text-sm text-gray-600">$51,000</span>
          </div>
          <p className="text-sm text-gray-500 mb-3">APY: 7.75%</p>
          <div className="flex space-x-2">
            <button className="flex-1 border border-purple-600 text-purple-600 py-2 px-3 rounded-lg text-sm hover:bg-purple-50">
              View Details
            </button>
            <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-purple-700">
              Manage Stake
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">USDC / ETH Pool</h3>
            <span className="text-sm text-gray-600">$15,000</span>
          </div>
          <p className="text-sm text-gray-500 mb-3">APY: 6.25%</p>
          <div className="flex space-x-2">
            <button className="flex-1 border border-purple-600 text-purple-600 py-2 px-3 rounded-lg text-sm hover:bg-purple-50">
              View Details
            </button>
            <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-purple-700">
              Manage Stake
            </button>
          </div>
        </div>
      </div>

      <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700">
        View All Stakes
      </button>
    </div>
  );
};

// Wallet Management Modal Content
export const WalletModalContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-blue-600">1</div>
        <div className="text-sm text-gray-500">Connected Wallet</div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800">MetaMask</h3>
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 12a2 2 0 114 0 2 2 0 01-4 0z" />
            </svg>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-3">0x508252d...c79872</p>
        <div className="flex space-x-2">
          <button className="flex-1 border border-blue-600 text-blue-600 py-2 px-3 rounded-lg text-sm hover:bg-blue-50">
            Copy Address
          </button>
          <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700">
            Disconnect
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <button className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg text-sm hover:bg-blue-50">
          Connect WalletConnect
        </button>
        <button className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg text-sm hover:bg-blue-50">
          Connect Coinbase Wallet
        </button>
      </div>

      <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700">
        Connect New Wallet
      </button>
    </div>
  );
};

// Pools Modal Content
export const PoolsModalContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-gray-800">Available Pools</div>
        <div className="text-sm text-gray-500">Discover new opportunities</div>
      </div>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">WETH / LISK</h3>
            <span className="text-sm text-green-600">7.75% APY</span>
          </div>
          <p className="text-sm text-gray-500 mb-3">TVL: $1.25M</p>
          <div className="flex space-x-2">
            <button className="flex-1 border border-purple-600 text-purple-600 py-2 px-3 rounded-lg text-sm hover:bg-purple-50">
              View Pool
            </button>
            <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-purple-700">
              Stake Now
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">USDC / ETH</h3>
            <span className="text-sm text-green-600">6.25% APY</span>
          </div>
          <p className="text-sm text-gray-500 mb-3">TVL: $850K</p>
          <div className="flex space-x-2">
            <button className="flex-1 border border-purple-600 text-purple-600 py-2 px-3 rounded-lg text-sm hover:bg-purple-50">
              View Pool
            </button>
            <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-purple-700">
              Stake Now
            </button>
          </div>
        </div>
      </div>

      <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700">
        Explore All Pools
      </button>
    </div>
  );
};
 