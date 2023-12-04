import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ["/dashboard", "/admin"];

const authMiddleware = withAuth(
  function middleware(req) {
    {
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: async ({ req, token }) => token?.token != null,
    },
  }
);

export async function middleware(req: NextRequest, res: NextResponse) {
  NextResponse.next();
  // return (authMiddleware as any)(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
