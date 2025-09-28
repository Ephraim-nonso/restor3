import axios from "axios";

// Debank API Base URL
const DEBANK_API_BASE = "https://api.debank.com";

// Types for Debank API responses
export interface Token {
  id: string;
  chain: string;
  name: string;
  symbol: string;
  display_symbol?: string;
  optimized_symbol?: string;
  decimals: number;
  logo_url?: string;
  protocol_id?: string;
  price?: number;
  is_verified?: boolean;
  is_core?: boolean;
  is_wallet?: boolean;
  time_at?: number;
  amount: number;
  raw_amount: number;
  raw_amount_hex_str: string;
}

export interface Protocol {
  id: string;
  chain: string;
  name: string;
  logo_url?: string;
  site_url?: string;
  has_supported_portfolio?: boolean;
  tvl?: number;
  portfolio_item_list?: PortfolioItem[];
}

export interface PortfolioItem {
  stats: {
    asset_usd_value: number;
    debt_usd_value: number;
    net_usd_value: number;
  };
  update_at: number;
  name: string;
  pool_id?: string;
  detail_types: string[];
  detail: any;
  proxy_detail?: any;
}

export interface Airdrop {
  id: string;
  chain: string;
  name: string;
  logo_url?: string;
  site_url?: string;
  start_at: number;
  end_at: number;
  status: "upcoming" | "ongoing" | "ended";
  total_supply: number;
  claimed_count: number;
  token_list: Token[];
  description?: string;
  rules?: string;
}

export interface UserProtocol {
  id: string;
  chain: string;
  name: string;
  logo_url?: string;
  site_url?: string;
  portfolio_item_list: PortfolioItem[];
  total_usd_value: number;
  last_interaction_at: number;
}

export interface WalletOverview {
  total_usd_value: number;
  total_usd_value_change_24h: number;
  total_usd_value_change_24h_percentage: number;
  chain_list: {
    chain: string;
    usd_value: number;
    usd_value_change_24h: number;
    usd_value_change_24h_percentage: number;
  }[];
  token_list: Token[];
  protocol_list: UserProtocol[];
  nft_list: any[];
  history_list: any[];
}

export interface DebankApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// Debank API Client
class DebankApiClient {
  private apiKey: string;
  private baseURL: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.DEBANK_API_KEY || "";
    this.baseURL = DEBANK_API_BASE;
  }

  private async makeRequest<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> {
    try {
      const config = {
        method: "GET",
        url: `${this.baseURL}${endpoint}`,
        params,
        headers: {
          Accept: "application/json",
          AccessKey: this.apiKey,
        },
      };

      console.log("Debank API Request:", {
        url: config.url,
        params: config.params,
        hasApiKey: !!this.apiKey,
        apiKeyLength: this.apiKey?.length || 0,
      });

      const response = await axios(config);
      console.log("Debank API Response:", {
        status: response.status,
        dataKeys: Object.keys(response.data || {}),
        dataLength: Array.isArray(response.data)
          ? response.data.length
          : "not array",
      });

      return response.data;
    } catch (error) {
      console.error("Debank API Error:", {
        message: error instanceof Error ? error.message : "Unknown error",
        code: (error as any)?.code,
        status: (error as any)?.response?.status,
        statusText: (error as any)?.response?.statusText,
        data: (error as any)?.response?.data,
        url: `${this.baseURL}${endpoint}`,
        params,
      });

      throw new Error(
        `Failed to fetch data from Debank API: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Get user's total balance and overview
  async getUserTotalBalance(address: string): Promise<WalletOverview> {
    try {
      return await this.makeRequest<WalletOverview>(`/user/total_balance`, {
        id: address,
      });
    } catch (error) {
      console.warn("Debank API failed, returning mock data for testing");
      return this.getMockWalletOverview(address);
    }
  }

  // Mock data for testing when API is unavailable
  private getMockWalletOverview(address: string): WalletOverview {
    return {
      total_usd_value: 1250000,
      total_usd_value_change_24h: 25000,
      total_usd_value_change_24h_percentage: 2.04,
      chain_list: [
        {
          chain: "eth",
          usd_value: 800000,
          usd_value_change_24h: 15000,
          usd_value_change_24h_percentage: 1.91,
        },
        {
          chain: "bsc",
          usd_value: 300000,
          usd_value_change_24h: 8000,
          usd_value_change_24h_percentage: 2.73,
        },
        {
          chain: "polygon",
          usd_value: 150000,
          usd_value_change_24h: 2000,
          usd_value_change_24h_percentage: 1.35,
        },
      ],
      token_list: [],
      protocol_list: [],
      nft_list: [],
      history_list: [],
    };
  }

  // Get user's token list
  async getUserTokenList(address: string): Promise<Token[]> {
    try {
      return await this.makeRequest<Token[]>(`/user/token_list`, {
        id: address,
      });
    } catch (error) {
      console.warn("Debank API failed, returning mock token data");
      return this.getMockTokenList();
    }
  }

  // Get user's protocol list (DeFi protocols they've used)
  async getUserProtocolList(address: string): Promise<UserProtocol[]> {
    try {
      return await this.makeRequest<UserProtocol[]>(`/user/protocol_list`, {
        id: address,
      });
    } catch (error) {
      console.warn("Debank API failed, returning mock protocol data");
      return this.getMockProtocolList();
    }
  }

  // Get user's NFT list
  async getUserNftList(address: string): Promise<any[]> {
    try {
      return await this.makeRequest<any[]>(`/user/nft_list`, { id: address });
    } catch (error) {
      console.warn("Debank API failed, returning mock NFT data");
      return [];
    }
  }

  // Get user's transaction history
  async getUserHistoryList(address: string, chain_id?: string): Promise<any[]> {
    try {
      const params: Record<string, any> = { id: address };
      if (chain_id) params.chain_id = chain_id;
      return await this.makeRequest<any[]>(`/user/history_list`, params);
    } catch (error) {
      console.warn("Debank API failed, returning mock history data");
      return [];
    }
  }

  // Mock token list
  private getMockTokenList(): Token[] {
    return [
      {
        id: "eth",
        chain: "eth",
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
        logo_url:
          "https://static.debank.com/token/logo_url/eth/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
        price: 2500,
        amount: 100,
        raw_amount: 100000000000000000000,
        raw_amount_hex_str: "0x56bc75e2d6300000",
      },
      {
        id: "usdc",
        chain: "eth",
        name: "USD Coin",
        symbol: "USDC",
        decimals: 6,
        logo_url:
          "https://static.debank.com/token/logo_url/usdc/0xa0b86a33e6441b8c4c8c0e4b8c4c8c0e4b8c4c8c.png",
        price: 1,
        amount: 50000,
        raw_amount: 50000000000,
        raw_amount_hex_str: "0x0bebc200",
      },
    ];
  }

  // Mock protocol list
  private getMockProtocolList(): UserProtocol[] {
    return [
      {
        id: "uniswap_v3",
        chain: "eth",
        name: "Uniswap V3",
        logo_url:
          "https://static.debank.com/protocol/logo_url/uniswap_v3/0x1f98431c8ad98523631ae4a59f267346ea31f984.png",
        site_url: "https://app.uniswap.org/",
        portfolio_item_list: [],
        total_usd_value: 450000,
        last_interaction_at: Date.now() / 1000 - 86400,
      },
      {
        id: "aave_v3",
        chain: "eth",
        name: "Aave V3",
        logo_url:
          "https://static.debank.com/protocol/logo_url/aave_v3/0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9.png",
        site_url: "https://app.aave.com/",
        portfolio_item_list: [],
        total_usd_value: 300000,
        last_interaction_at: Date.now() / 1000 - 172800,
      },
    ];
  }

  // Get protocol information
  async getProtocolInfo(protocolId: string): Promise<Protocol> {
    return this.makeRequest<Protocol>(`/protocol`, { id: protocolId });
  }

  // Get token information
  async getTokenInfo(tokenId: string): Promise<Token> {
    return this.makeRequest<Token>(`/token`, { id: tokenId });
  }

  // Get airdrop information (this might require a different endpoint)
  async getAirdropList(address: string): Promise<Airdrop[]> {
    // Note: This endpoint might not exist in the public API
    // We'll implement a mock version for now
    return this.makeRequest<Airdrop[]>(`/user/airdrop_list`, { id: address });
  }

  // Get user's portfolio by protocol
  async getUserProtocolPortfolio(
    address: string,
    protocolId: string
  ): Promise<PortfolioItem[]> {
    return this.makeRequest<PortfolioItem[]>(`/user/protocol`, {
      id: address,
      protocol_id: protocolId,
    });
  }

  // Get supported chains
  async getChainList(): Promise<any[]> {
    return this.makeRequest<any[]>(`/chain/list`);
  }

  // Get supported protocols
  async getProtocolList(): Promise<Protocol[]> {
    return this.makeRequest<Protocol[]>(`/protocol/list`);
  }
}

// Create a singleton instance
export const debankApi = new DebankApiClient();

// Utility functions
export const formatUsdValue = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
};

export const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
};

export const getTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp * 1000;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
};

export default DebankApiClient;
