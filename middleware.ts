import { NextResponse, type NextRequest } from "next/server";
import { isAuthedFromCookieValue, COOKIE_NAME } from "@/lib/adminAuth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const isLoginPage = pathname === "/admin/login";
  const session = request.cookies.get(COOKIE_NAME)?.value;
  const authed = isAuthedFromCookieValue(session);

  if (!isLoginPage && !authed) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginPage && authed) {
    return NextResponse.redirect(new URL("/admin/overview", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
