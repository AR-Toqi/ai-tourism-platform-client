import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // Public routes that should not be accessible if logged in (like login/register)
  const isAuthRoute = pathname.startsWith("/login") || 
                     pathname.startsWith("/register") || 
                     pathname.startsWith("/forgot-password") || 
                     pathname.startsWith("/reset-password") || 
                     pathname.startsWith("/verify-email");

  // Protected routes
  const isProtectedRoute = pathname.startsWith("/profile") || 
                          pathname.startsWith("/itineraries") || 
                          pathname.startsWith("/ai-chat") || 
                          pathname.startsWith("/saved") || 
                          pathname.startsWith("/admin") || 
                          pathname.startsWith("/content-manager");

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
