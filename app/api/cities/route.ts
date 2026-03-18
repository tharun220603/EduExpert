import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const stateId = searchParams.get("stateId");

    if (!stateId) {
      return NextResponse.json({ error: "stateId is required" }, { status: 400 });
    }
    
    const response = await fetch(`https://eduexpert.gaticrm.com/api/v1/getcities?stateId=${stateId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Cities API Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
