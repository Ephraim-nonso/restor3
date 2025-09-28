import { NextRequest, NextResponse } from "next/server";
import { debankApi } from "@/lib/debank";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    const protocolId = searchParams.get("protocolId");

    if (!address) {
      return NextResponse.json(
        { error: "Address parameter is required" },
        { status: 400 }
      );
    }

    // Validate Ethereum address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return NextResponse.json(
        { error: "Invalid Ethereum address format" },
        { status: 400 }
      );
    }

    // If protocolId is provided, get detailed protocol data
    if (protocolId) {
      const [protocolInfo, protocolPortfolio] = await Promise.allSettled([
        debankApi.getProtocolInfo(protocolId),
        debankApi.getUserProtocolPortfolio(address, protocolId),
      ]);

      return NextResponse.json({
        success: true,
        data: {
          protocolInfo:
            protocolInfo.status === "fulfilled" ? protocolInfo.value : null,
          protocolPortfolio:
            protocolPortfolio.status === "fulfilled"
              ? protocolPortfolio.value
              : [],
          address,
          protocolId,
          lastUpdated: new Date().toISOString(),
        },
      });
    }

    // Get comprehensive DeFi data
    const [
      totalBalance,
      tokenList,
      protocolList,
      nftList,
      historyList,
      chainList,
    ] = await Promise.allSettled([
      debankApi.getUserTotalBalance(address),
      debankApi.getUserTokenList(address),
      debankApi.getUserProtocolList(address),
      debankApi.getUserNftList(address),
      debankApi.getUserHistoryList(address),
      debankApi.getChainList(),
    ]);

    // Process and enrich the data
    const defiDetails = {
      address,
      totalBalance:
        totalBalance.status === "fulfilled" ? totalBalance.value : null,
      tokenList: tokenList.status === "fulfilled" ? tokenList.value : [],
      protocolList:
        protocolList.status === "fulfilled" ? protocolList.value : [],
      nftList: nftList.status === "fulfilled" ? nftList.value : [],
      historyList: historyList.status === "fulfilled" ? historyList.value : [],
      chainList: chainList.status === "fulfilled" ? chainList.value : [],
      lastUpdated: new Date().toISOString(),
      errors: [],
    };

    // Calculate additional metrics
    if (defiDetails.totalBalance) {
      defiDetails.totalBalance = {
        ...defiDetails.totalBalance,
        // Add calculated fields
        totalTokens: defiDetails.tokenList.length,
        totalProtocols: defiDetails.protocolList.length,
        totalNfts: defiDetails.nftList.length,
        totalTransactions: defiDetails.historyList.length,
      };
    }

    // Collect any errors
    if (totalBalance.status === "rejected") {
      defiDetails.errors.push("Failed to fetch total balance");
    }
    if (tokenList.status === "rejected") {
      defiDetails.errors.push("Failed to fetch token list");
    }
    if (protocolList.status === "rejected") {
      defiDetails.errors.push("Failed to fetch protocol list");
    }
    if (nftList.status === "rejected") {
      defiDetails.errors.push("Failed to fetch NFT list");
    }
    if (historyList.status === "rejected") {
      defiDetails.errors.push("Failed to fetch transaction history");
    }
    if (chainList.status === "rejected") {
      defiDetails.errors.push("Failed to fetch chain list");
    }

    return NextResponse.json({
      success: true,
      data: defiDetails,
    });
  } catch (error) {
    console.error("Error fetching DeFi details:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch DeFi details",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}



