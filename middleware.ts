import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const token = request.cookies.get("token");
  const role = request.cookies.get("role")?.value;

  const pathname = request.nextUrl.pathname;


  // Not logged in
  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }


  // Admin only route
  if (
    pathname.startsWith("/admin") &&
    role !== "admin"
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }


  // User cannot access dashboard
  if (
    pathname.startsWith("/dashboard") &&
    role !== "admin" &&
    role !== "user"
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }


  return NextResponse.next();
}


export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
  ],
};