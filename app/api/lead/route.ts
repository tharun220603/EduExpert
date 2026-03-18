import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch("https://eduexpert.gaticrm.com/api/v1/lead/create", {
      method: "POST",
      headers: {
        "secret-key": "0ddc7c7529a8caea366743861",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Lead API Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to process lead request" },
      { status: 500 }
    );
  }
}
