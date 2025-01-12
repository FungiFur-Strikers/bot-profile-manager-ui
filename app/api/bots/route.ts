import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { error: "API_URL is not defined" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(apiUrl + "/bot/*/profile");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from API" },
      { status: 500 }
    );
  }
}
