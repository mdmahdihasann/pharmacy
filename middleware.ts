import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const pathname = request.nextUrl.pathname;


  // Login check
  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }


  // Admin route only
  if (
    pathname.startsWith("/admin") &&
    role !== "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }


  // Dashboard access
  if (
    pathname.startsWith("/dashboard") &&
    role !== "ADMIN" &&
    role !== "USER"
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