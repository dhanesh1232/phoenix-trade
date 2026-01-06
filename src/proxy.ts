import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SECRET_ADMIN_PATH } from "./lib/validators_client";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAdmin = pathname.startsWith(`/${SECRET_ADMIN_PATH}`);
  const isAuthPage = pathname.startsWith(`/${SECRET_ADMIN_PATH}/auth`);

  // Canonical URL handling
  if (url.pathname.startsWith("/products")) {
    const canonicalUrl = `https://www.phoenixexporthub.com${url.pathname}`;
    const response = NextResponse.next();
    response.headers.set("Link", `<${canonicalUrl}>; rel="canonical"`);
    return response;
  }

  // 1️⃣ Public pages → always allowed
  if (!isAdmin) {
    return NextResponse.next();
  }

  // 2️⃣ Admin Auth Routes (signin/signup/forgot)
  if (isAuthPage) {
    // Already logged in → redirect to dashboard
    if (token) {
      url.pathname = `/${SECRET_ADMIN_PATH}/`;
      return NextResponse.redirect(url);
    }
    return NextResponse.next(); // Allow auth page if no token
  }

  // 3️⃣ Any other admin route → requires token
  if (isAdmin && !token) {
    url.pathname = `/${SECRET_ADMIN_PATH}/auth/signin`;
    return NextResponse.redirect(url);
  }

  // 4️⃣ Token exists → allow admin access
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|api).*)"],
};
