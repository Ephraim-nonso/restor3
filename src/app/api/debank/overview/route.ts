import { NextRequest, NextResponse } from "next/server";
import { debankApi } from "@/lib/debank";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

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

    // Fetch all overview data in parallel
    const [totalBalance, tokenList, protocolList, nftList, historyList] =
      await Promise.allSettled([
        debankApi.getUserTotalBalance(address),
        debankApi.getUserTokenList(address),
        debankApi.getUserProtocolList(address),
        debankApi.getUserNftList(address),
        debankApi.getUserHistoryList(address),
      ]);

    // Process results
    const overview = {
      address,
      totalBalance:
        totalBalance.status === "fulfilled" ? totalBalance.value : null,
      tokenList: tokenList.status === "fulfilled" ? tokenList.value : [],
      protocolList:
        protocolList.status === "fulfilled" ? protocolList.value : [],
      nftList: nftList.status === "fulfilled" ? nftList.value : [],
      historyList: historyList.status === "fulfilled" ? historyList.value : [],
      lastUpdated: new Date().toISOString(),
      errors: [] as string[],
    };

    // Collect any errors
    if (totalBalance.status === "rejected") {
      overview.errors.push("Failed to fetch total balance");
    }
    if (tokenList.status === "rejected") {
      overview.errors.push("Failed to fetch token list");
    }
    if (protocolList.status === "rejected") {
      overview.errors.push("Failed to fetch protocol list");
    }
    if (nftList.status === "rejected") {
      overview.errors.push("Failed to fetch NFT list");
    }
    if (historyList.status === "rejected") {
      overview.errors.push("Failed to fetch transaction history");
    }

    return NextResponse.json({
      success: true,
      data: overview,
    });
  } catch (error) {
    console.error("Error fetching Debank overview:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch wallet overview",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
