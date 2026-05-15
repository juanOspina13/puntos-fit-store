import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware: si la URL trae `?tk=...` o `?userToken=...`, guardamos ese token
 * en la cookie httpOnly `user-token` y redirigimos a la misma URL sin el query
 * param. Esto permite que el Header (server component) lea la cookie y muestre
 * los Puntos Fit del usuario en el primer render, sin esperar a que el cliente
 * hidrate.
 */
export function middleware(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;
  const tk = searchParams.get("tk") ?? searchParams.get("userToken");

  if (!tk) return NextResponse.next();

  // Construir URL limpia (sin tk / userToken) preservando los demás params.
  const cleanUrl = request.nextUrl.clone();
  cleanUrl.searchParams.delete("tk");
  cleanUrl.searchParams.delete("userToken");
  cleanUrl.pathname = pathname;

  const response = NextResponse.redirect(cleanUrl);
  response.cookies.set("user-token", tk, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: "/",
  });

  return response;
}

export const config = {
  // Aplicamos a todo excepto a assets internos / API routes.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
