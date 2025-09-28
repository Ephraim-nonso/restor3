"use client";

import React from "react";
import { useDebank } from "../hooks/useDebank";
import {
  formatUsdValue,
  formatPercentage,
  getTimeAgo,
  UserProtocol,
} from "@/lib/debank";

interface WalletOverviewProps {
  address: string;
  onViewDetails?: () => void;
}

const WalletOverview: React.FC<WalletOverviewProps> = ({
  address,
  onViewDetails,
}) => {
  // Don't fetch data if address is empty
  const shouldFetch = !!(address && address.length > 0);

  const {
    overview,
    protocols,
    tokens,
    airdrops,
    loading,
    error,
    getTotalValue,
    getValueChange24h,
    getValueChange24hPercentage,
    getTopProtocols,
    getTopTokens,
    getProtocolsByChain,
    getTokensByChain,
  } = useDebank({ address, enabled: shouldFetch });

  // Show message if no address provided
  if (!address || address.length === 0) {
    return (
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
          No Wallet Address
        </h3>
        <p className="text-gray-600">
          Please select a wallet to view DeFi data.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="text-red-500 text-lg font-semibold mb-2">
            Error Loading Data
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalValue = getTotalValue();
  const valueChange24h = getValueChange24h();
  const valueChange24hPercentage = getValueChange24hPercentage();
  const topProtocols = getTopProtocols(5);
  const topTokens = getTopTokens(10);
  const protocolsByChain = getProtocolsByChain();
  const tokensByChain = getTokensByChain();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Wallet Overview
            </h2>
            <p className="text-gray-600 text-sm font-mono">{address}</p>
          </div>
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              View Details
            </button>
          )}
        </div>

        {/* Total Value */}
        <div className="mb-6">
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {overview?.total_usd_value
              ? formatUsdValue(overview.total_usd_value)
              : formatUsdValue(totalValue)}
          </div>
          <div
            className={`flex items-center text-sm ${
              (overview?.total_usd_value_change_24h ?? valueChange24h) >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            <span className="mr-2">
              {(overview?.total_usd_value_change_24h ?? valueChange24h) >= 0
                ? "↗"
                : "↘"}{" "}
              {formatUsdValue(
                Math.abs(overview?.total_usd_value_change_24h ?? valueChange24h)
              )}
            </span>
            <span>
              (
              {formatPercentage(
                overview?.total_usd_value_change_24h_percentage ??
                  valueChange24hPercentage
              )}
              )
            </span>
            <span className="text-gray-500 ml-2">24h</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {overview?.protocol_list?.length ?? protocols.length}
            </div>
            <div className="text-sm text-gray-600">Active Protocols</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {overview?.token_list?.length ?? tokens.length}
            </div>
            <div className="text-sm text-gray-600">Tokens</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {overview?.nft_list?.length ?? airdrops.length}
            </div>
            <div className="text-sm text-gray-600">NFTs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {overview?.chain_list?.length ??
                Object.keys(protocolsByChain).length}
            </div>
            <div className="text-sm text-gray-600">Chains</div>
          </div>
        </div>
      </div>

      {/* Top Protocols */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top Protocols
        </h3>
        <div className="space-y-3">
          {topProtocols.map((protocol, index) => (
            <div
              key={protocol.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                  {protocol.logo_url ? (
                    <img
                      src={protocol.logo_url}
                      alt={protocol.name}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-gray-600">
                      {protocol.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {protocol.name}
                  </div>
                  <div className="text-sm text-gray-600">{protocol.chain}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  {formatUsdValue(protocol.total_usd_value)}
                </div>
                <div className="text-sm text-gray-600">
                  {protocol.portfolio_item_list.length} position
                  {protocol.portfolio_item_list.length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Tokens */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Tokens</h3>
        <div className="space-y-3">
          {topTokens.slice(0, 5).map((token, index) => (
            <div
              key={token.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                  {token.logo_url ? (
                    <img
                      src={token.logo_url}
                      alt={token.symbol}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-gray-600">
                      {token.symbol.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {token.symbol}
                  </div>
                  <div className="text-sm text-gray-600">{token.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  {formatUsdValue((token.amount || 0) * (token.price || 0))}
                </div>
                <div className="text-sm text-gray-600">
                  {token.amount?.toFixed(4)} {token.symbol}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chain Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Chain Distribution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(protocolsByChain).map(([chain, chainProtocols]) => {
            const protocols = chainProtocols as UserProtocol[];
            return (
              <div key={chain} className="p-4 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900 mb-2">{chain}</div>
                <div className="text-sm text-gray-600 mb-2">
                  {protocols.length} protocol{protocols.length !== 1 ? "s" : ""}
                </div>
                <div className="text-sm text-gray-600">
                  Total Value:{" "}
                  {formatUsdValue(
                    protocols.reduce(
                      (sum: number, p: UserProtocol) => sum + p.total_usd_value,
                      0
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Airdrops Section */}
      {airdrops.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Available Airdrops
          </h3>
          <div className="space-y-3">
            {airdrops.map((airdrop) => (
              <div
                key={airdrop.id}
                className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-200 rounded-full mr-3 flex items-center justify-center">
                    {airdrop.logo_url ? (
                      <img
                        src={airdrop.logo_url}
                        alt={airdrop.name}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-green-600">
                        {airdrop.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {airdrop.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      Status:{" "}
                      <span
                        className={`font-medium ${
                          airdrop.status === "ongoing"
                            ? "text-green-600"
                            : airdrop.status === "upcoming"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {airdrop.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {airdrop.claimed_count} / {airdrop.total_supply} claimed
                  </div>
                  <div className="text-xs text-gray-500">
                    {airdrop.token_list.length} token
                    {airdrop.token_list.length !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletOverview;
