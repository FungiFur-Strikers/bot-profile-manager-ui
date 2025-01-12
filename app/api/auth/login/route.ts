import { SignJWT } from "jose";
import { NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-key"
);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // TODO: Implement actual authentication logic
    // This is a mock authentication
    if (
      email === process.env.ADMIN_USER_EMAIL &&
      password === process.env.ADMIN_USER_PASSWORD
    ) {
      const token = await new SignJWT({ email })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(JWT_SECRET);

      const response = NextResponse.json({ success: true }, { status: 200 });

      response.cookies.set("auth-token", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
