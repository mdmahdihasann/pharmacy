import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const role = request.cookies.get("role");

  const pathname = request.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (
    pathname.startsWith("/admin") &&
    role?.value !== "admin"
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
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