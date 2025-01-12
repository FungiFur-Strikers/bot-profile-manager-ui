import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-key'
);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');

  if (request.nextUrl.pathname.startsWith('/api/bots')) {
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    try {
      await jwtVerify(token.value, JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/bots/:path*'],
};