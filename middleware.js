import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default async function middleware(req) {
  const session = await auth()

  // Block access to admin routes if user is not an admin
  if (!session?.user?.isAdmin) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"]
}
