import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Redirect /ge/* to /ka/*
  if (request.nextUrl.pathname.startsWith("/ge")) {
    const newPathname = request.nextUrl.pathname.replace(/^\/ge/, "/ka");
    return NextResponse.redirect(
      new URL(newPathname + request.nextUrl.search, request.url)
    );
  }

  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames and old /ge paths
  matcher: ["/", "/(ka|en|ge)/:path*"],
};
