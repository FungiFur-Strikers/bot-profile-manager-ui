import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { error: "API_URL is not defined" },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const botId = searchParams.get("bot-id") ?? "*";
    const response = await fetch(apiUrl + `/bot/${botId}/profile`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from API" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const formdata = await request.json();
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { error: "API_URL is not defined" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      apiUrl + "/bot/" + formdata.botId + "/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formdata.name,
          personality: formdata.personality,
          avatar: formdata.avatar,
        }),
      }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from API" },
      { status: 500 }
    );
  }
}
