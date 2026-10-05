import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  INTERNAL_API_URL,
  REFRESH_TOKEN_COOKIE,
} from "@/src/lib/api-config";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/backend") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/login")) {
    const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE);

    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE);
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE);

  if (!accessToken && refreshToken) {
    const refreshResponse = await fetch(`${INTERNAL_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: `${REFRESH_TOKEN_COOKIE}=${refreshToken.value}`,
      },
    });

    if (refreshResponse.ok) {
      const response = NextResponse.next();
      const setCookies = refreshResponse.headers.getSetCookie();

      for (const cookie of setCookies) {
        response.headers.append("Set-Cookie", cookie);
      }

      return response;
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
