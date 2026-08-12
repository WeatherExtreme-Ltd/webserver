import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const session = request.cookies.get("session")?.value;

  if (token) {
        if (token !== process.env.DASHBOARD_TOKEN) {
            return new NextResponse("Forbidden: Invalid token", { status: 403 });
        }
        const sessionValue = crypto.randomUUID();
        const cleanUrl = new URL(request.nextUrl.pathname, request.url);
        const response = NextResponse.redirect(cleanUrl);

        response.cookies.set({
            name: "session",
            value: sessionValue,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });
        //Token was good, create session, let them through
        return response;
    }

    // No token in URL AND no session cookie
    if (!session) {
        return new NextResponse("Forbidden: Access denied", { status: 403 });
    }
    // Valid session, no token, let them through
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};