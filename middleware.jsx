import { stackServerApp } from "./stack";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request) {
  try {
    const user = await stackServerApp.getUser();
    
    // Handle root path - redirect to dashboard if authenticated, sign-in if not
    if (request.nextUrl.pathname === '/') {
      if (user) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } else {
        return NextResponse.redirect(new URL('/handler/sign-in', request.url));
      }
    }
    
    // Handle dashboard routes - require authentication
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      if (!user) {
        return NextResponse.redirect(new URL('/handler/sign-in', request.url));
      }
    }
    
    // Allow access for authenticated users or non-protected routes
    return NextResponse.next();
  } catch (error) {
    // Handle any errors in authentication check
    console.error('Middleware authentication error:', error);
    return NextResponse.redirect(new URL('/handler/sign-in', request.url));
  }
}

export const config = {
  // Protect dashboard routes and also redirect root to dashboard
  matcher: ['/dashboard/:path*', '/'],
};