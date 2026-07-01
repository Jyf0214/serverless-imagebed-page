import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n/dict";

const COOKIE = "locale";

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE)?.value;
  const locale = locales.includes(cookie as (typeof locales)[number])
    ? (cookie as (typeof locales)[number])
    : defaultLocale;

  const res = NextResponse.next();
  res.headers.set("x-locale", locale);

  // 首次访问时设置默认语言 cookie
  if (!cookie) {
    res.cookies.set(COOKIE, defaultLocale, { path: "/", maxAge: 31536000 });
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
