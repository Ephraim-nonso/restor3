"use client";

import React, { useState } from "react";
import { useDebank } from "../hooks/useDebank";
import { formatUsdValue, formatPercentage, getTimeAgo } from "@/lib/debank";

interface DeFiDetailsProps {
  address: string;
  onBack?: () => void;
}

const DeFiDetails: React.FC<DeFiDetailsProps> = ({ address, onBack }) => {
  const {
    overview,
    protocols,
    tokens,
    airdrops,
    defiDetails,
    defiLoading,
    defiError,
    fetchDefiDetails,
    getTotalValue,
    getValueChange24h,
    getValueChange24hPercentage,
    getTopProtocols,
    getTopTokens,
    getProtocolsByChain,
    getTokensByChain,
  } = useDebank({ address });

  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "protocols" | "tokens" | "airdrops" | "history"
  >("protocols");

  const handleProtocolClick = (protocolId: string) => {
    setSelectedProtocol(protocolId);
    fetchDefiDetails(protocolId);
  };

  const totalValue = getTotalValue();
  const valueChange24h = getValueChange24h();
  const valueChange24hPercentage = getValueChange24hPercentage();
  const protocolsByChain = getProtocolsByChain();
  const tokensByChain = getTokensByChain();

  if (defiLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (defiError) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="text-red-500 text-lg font-semibold mb-2">
            Error Loading DeFi Details
          </div>
          <p className="text-gray-600 mb-4">{defiError}</p>
          <button
            onClick={() => fetchDefiDetails()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">DeFi Details</h2>
            <p className="text-gray-600 text-sm font-mono">{address}</p>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Back to Overview
            </button>
          )}
        </div>

        {/* Total Value */}
        <div className="mb-6">
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {formatUsdValue(totalValue)}
          </div>
          <div
            className={`flex items-center text-sm ${
              valueChange24h >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            <span className="mr-2">
              {valueChange24h >= 0 ? "↗" : "↘"}{" "}
              {formatUsdValue(Math.abs(valueChange24h))}
            </span>
            <span>({formatPercentage(valueChange24hPercentage)})</span>
            <span className="text-gray-500 ml-2">24h</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: "protocols", label: "Protocols", count: protocols.length },
            { id: "tokens", label: "Tokens", count: tokens.length },
            { id: "airdrops", label: "Airdrops", count: airdrops.length },
            {
              id: "history",
              label: "History",
              count: defiDetails?.historyList?.length || 0,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "protocols" && (
        <div className="space-y-6">
          {/* Protocol Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Protocol Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {protocols.length}
                </div>
                <div className="text-sm text-gray-600">Total Protocols</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {formatUsdValue(
                    protocols.reduce((sum, p) => sum + p.total_usd_value, 0)
                  )}
                </div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {Object.keys(protocolsByChain).length}
                </div>
                <div className="text-sm text-gray-600">Chains</div>
              </div>
            </div>
          </div>

          {/* Protocol List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              All Protocols
            </h3>
            <div className="space-y-4">
              {protocols.map((protocol) => (
                <div
                  key={protocol.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleProtocolClick(protocol.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                        {protocol.logo_url ? (
                          <img
                            src={protocol.logo_url}
                            alt={protocol.name}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <span className="text-lg font-semibold text-gray-600">
                            {protocol.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {protocol.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {protocol.chain}
                        </div>
                        <div className="text-sm text-gray-500">
                          Last interaction:{" "}
                          {getTimeAgo(protocol.last_interaction_at)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        {formatUsdValue(protocol.total_usd_value)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {protocol.portfolio_item_list.length} position
                        {protocol.portfolio_item_list.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "tokens" && (
        <div className="space-y-6">
          {/* Token Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Token Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {tokens.length}
                </div>
                <div className="text-sm text-gray-600">Total Tokens</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {formatUsdValue(
                    tokens.reduce(
                      (sum, t) => sum + (t.amount || 0) * (t.price || 0),
                      0
                    )
                  )}
                </div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {Object.keys(tokensByChain).length}
                </div>
                <div className="text-sm text-gray-600">Chains</div>
              </div>
            </div>
          </div>

          {/* Token List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              All Tokens
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Token
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chain
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tokens.map((token) => (
                    <tr key={token.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
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
                            <div className="text-sm font-medium text-gray-900">
                              {token.symbol}
                            </div>
                            <div className="text-sm text-gray-500">
                              {token.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {token.amount?.toFixed(6) || "0"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {token.price ? formatUsdValue(token.price) : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatUsdValue(
                          (token.amount || 0) * (token.price || 0)
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {token.chain}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "airdrops" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Available Airdrops
            </h3>
            {airdrops.length > 0 ? (
              <div className="space-y-4">
                {airdrops.map((airdrop) => (
                  <div
                    key={airdrop.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                          {airdrop.logo_url ? (
                            <img
                              src={airdrop.logo_url}
                              alt={airdrop.name}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <span className="text-lg font-semibold text-gray-600">
                              {airdrop.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {airdrop.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {airdrop.chain}
                          </div>
                          <div className="text-sm text-gray-500">
                            {airdrop.description || "No description available"}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            airdrop.status === "ongoing"
                              ? "bg-green-100 text-green-800"
                              : airdrop.status === "upcoming"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {airdrop.status}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {airdrop.claimed_count} / {airdrop.total_supply}{" "}
                          claimed
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 text-lg">
                  No airdrops available
                </div>
                <div className="text-gray-400 text-sm">
                  Check back later for new opportunities
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Transaction History
            </h3>
            {defiDetails?.historyList?.length > 0 ? (
              <div className="space-y-4">
                {defiDetails.historyList
                  .slice(0, 20)
                  .map((tx: any, index: number) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">
                            {tx.name || "Transaction"}
                          </div>
                          <div className="text-sm text-gray-600">
                            {tx.chain}
                          </div>
                          <div className="text-sm text-gray-500">
                            {tx.time_at
                              ? getTimeAgo(tx.time_at)
                              : "Unknown time"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-900">
                            {tx.value ? formatUsdValue(tx.value) : "N/A"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {tx.tx?.hash
                              ? `${tx.tx.hash.slice(0, 8)}...`
                              : "No hash"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 text-lg">
                  No transaction history available
                </div>
                <div className="text-gray-400 text-sm">
                  Transaction data may not be available for this address
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Selected Protocol Details */}
      {selectedProtocol && defiDetails?.protocolInfo && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {defiDetails.protocolInfo.name} Details
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Protocol ID</div>
                <div className="font-medium text-gray-900">
                  {defiDetails.protocolInfo.id}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Chain</div>
                <div className="font-medium text-gray-900">
                  {defiDetails.protocolInfo.chain}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Site URL</div>
                <div className="font-medium text-gray-900">
                  {defiDetails.protocolInfo.site_url ? (
                    <a
                      href={defiDetails.protocolInfo.site_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {defiDetails.protocolInfo.site_url}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">TVL</div>
                <div className="font-medium text-gray-900">
                  {defiDetails.protocolInfo.tvl
                    ? formatUsdValue(defiDetails.protocolInfo.tvl)
                    : "N/A"}
                </div>
              </div>
            </div>

            {defiDetails.protocolPortfolio &&
              defiDetails.protocolPortfolio.length > 0 && (
                <div>
                  <div className="text-sm text-gray-600 mb-2">
                    Portfolio Items
                  </div>
                  <div className="space-y-2">
                    {defiDetails.protocolPortfolio.map(
                      (item: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            Value:{" "}
                            {formatUsdValue(item.stats?.net_usd_value || 0)}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeFiDetails;



