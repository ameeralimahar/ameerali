import { NextResponse, type NextRequest } from "next/server";

const ADMIN_PIN = process.env.ADMIN_PIN ?? "0000";
const COOKIE_NAME = "admin_session";
const COOKIE_VALUE = `pin_ok_${ADMIN_PIN}`;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const isLoginPage = pathname === "/admin/login";
  const session = request.cookies.get(COOKIE_NAME)?.value;
  const isAuthed = session === COOKIE_VALUE;

  if (!isLoginPage && !isAuthed) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginPage && isAuthed) {
    return NextResponse.redirect(new URL("/admin/overview", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
