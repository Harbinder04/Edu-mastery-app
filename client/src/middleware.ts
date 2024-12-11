// Middleware example (middleware.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const path = req.nextUrl.pathname;

  // Protect upload routes
  if (path.startsWith('/upload')) {
    if (!token) {
      return NextResponse.redirect(new URL('/signup', req.url));
    }
  }

  return NextResponse.next();
}

// Specify which routes to protect
export const config = {
  matcher: ['/upload/:path*']
}