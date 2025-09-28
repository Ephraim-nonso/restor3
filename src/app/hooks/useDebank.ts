"use client";

import { useState, useEffect, useCallback } from "react";
import { WalletOverview, UserProtocol, Token, Airdrop } from "@/lib/debank";

interface UseDebankProps {
  address: string;
  enabled?: boolean;
}

interface DebankData {
  overview: WalletOverview | null;
  protocols: UserProtocol[];
  tokens: Token[];
  airdrops: Airdrop[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export const useDebank = ({ address, enabled = true }: UseDebankProps) => {
  const [data, setData] = useState<DebankData>({
    overview: null,
    protocols: [],
    tokens: [],
    airdrops: [],
    loading: false,
    error: null,
    lastUpdated: null,
  });

  const [defiDetails, setDefiDetails] = useState<any>(null);
  const [defiLoading, setDefiLoading] = useState(false);
  const [defiError, setDefiError] = useState<string | null>(null);

  // Fetch overview data
  const fetchOverview = useCallback(async () => {
    if (!address || !enabled) return;

    setData((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(`/api/debank/overview?address=${address}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch overview data");
      }

      if (result.success && result.data) {
        setData((prev) => ({
          ...prev,
          overview: result.data.totalBalance,
          protocols: result.data.protocolList || [],
          tokens: result.data.tokenList || [],
          airdrops: result.data.airdropList || [],
          loading: false,
          error: null,
          lastUpdated: result.data.lastUpdated,
        }));
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching Debank overview:", error);
      setData((prev) => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch overview data",
      }));
    }
  }, [address, enabled]);

  // Fetch detailed DeFi data
  const fetchDefiDetails = useCallback(
    async (protocolId?: string) => {
      if (!address || !enabled) return;

      setDefiLoading(true);
      setDefiError(null);

      try {
        const url = protocolId
          ? `/api/debank/defi-details?address=${address}&protocolId=${protocolId}`
          : `/api/debank/defi-details?address=${address}`;

        const response = await fetch(url);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch DeFi details");
        }

        if (result.success && result.data) {
          setDefiDetails(result.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching DeFi details:", error);
        setDefiError(
          error instanceof Error
            ? error.message
            : "Failed to fetch DeFi details"
        );
      } finally {
        setDefiLoading(false);
      }
    },
    [address, enabled]
  );

  // Refresh all data
  const refresh = useCallback(() => {
    fetchOverview();
    fetchDefiDetails();
  }, [fetchOverview, fetchDefiDetails]);

  // Auto-fetch on mount and when address changes
  useEffect(() => {
    if (enabled && address) {
      fetchOverview();
    }
  }, [fetchOverview, enabled, address]);

  // Utility functions
  const getTotalValue = useCallback(() => {
    return data.overview?.total_usd_value || 0;
  }, [data.overview]);

  const getValueChange24h = useCallback(() => {
    return data.overview?.total_usd_value_change_24h || 0;
  }, [data.overview]);

  const getValueChange24hPercentage = useCallback(() => {
    return data.overview?.total_usd_value_change_24h_percentage || 0;
  }, [data.overview]);

  const getTopProtocols = useCallback(
    (limit: number = 5) => {
      return data.protocols
        .sort((a, b) => b.total_usd_value - a.total_usd_value)
        .slice(0, limit);
    },
    [data.protocols]
  );

  const getTopTokens = useCallback(
    (limit: number = 10) => {
      return data.tokens
        .sort((a, b) => b.amount * (b.price || 0) - a.amount * (a.price || 0))
        .slice(0, limit);
    },
    [data.tokens]
  );

  const getProtocolsByChain = useCallback(() => {
    const chainMap = new Map();
    data.protocols.forEach((protocol) => {
      if (!chainMap.has(protocol.chain)) {
        chainMap.set(protocol.chain, []);
      }
      chainMap.get(protocol.chain).push(protocol);
    });
    return Object.fromEntries(chainMap);
  }, [data.protocols]);

  const getTokensByChain = useCallback(() => {
    const chainMap = new Map();
    data.tokens.forEach((token) => {
      if (!chainMap.has(token.chain)) {
        chainMap.set(token.chain, []);
      }
      chainMap.get(token.chain).push(token);
    });
    return Object.fromEntries(chainMap);
  }, [data.tokens]);

  return {
    // Data
    overview: data.overview,
    protocols: data.protocols,
    tokens: data.tokens,
    airdrops: data.airdrops,
    defiDetails,

    // Loading states
    loading: data.loading,
    defiLoading,

    // Error states
    error: data.error,
    defiError,

    // Metadata
    lastUpdated: data.lastUpdated,

    // Actions
    fetchOverview,
    fetchDefiDetails,
    refresh,

    // Utility functions
    getTotalValue,
    getValueChange24h,
    getValueChange24hPercentage,
    getTopProtocols,
    getTopTokens,
    getProtocolsByChain,
    getTokensByChain,
  };
};



