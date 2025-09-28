import { NextRequest, NextResponse } from "next/server";
import { debankApi } from "@/lib/debank";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address =
      searchParams.get("address") ||
      "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

    console.log("Testing Debank API connection...");
    console.log("API Key present:", !!process.env.DEBANK_API_KEY);
    console.log("API Key length:", process.env.DEBANK_API_KEY?.length || 0);
    console.log("Testing address:", address);

    // Test with a simple endpoint first
    const testResult = await debankApi.getUserTotalBalance(address);

    return NextResponse.json({
      success: true,
      message: "Debank API connection successful",
      data: {
        address,
        hasApiKey: !!process.env.DEBANK_API_KEY,
        apiKeyLength: process.env.DEBANK_API_KEY?.length || 0,
        result: testResult,
      },
    });
  } catch (error) {
    console.error("Debank API test failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Debank API connection failed",
        details: {
          message: error instanceof Error ? error.message : "Unknown error",
          hasApiKey: !!process.env.DEBANK_API_KEY,
          apiKeyLength: process.env.DEBANK_API_KEY?.length || 0,
          error: error,
        },
      },
      { status: 500 }
    );
  }
}



