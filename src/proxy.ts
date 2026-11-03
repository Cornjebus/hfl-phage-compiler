/**
 * Route protection: /dashboard requires a session; everything else is public.
 * Cookie presence is the fast optimistic gate (Better Auth's recommended
 * middleware pattern) — real session verification happens server-side in
 * the pages via auth.api.getSession.
 */
import { getSessionCookie } from 'better-auth/cookies';
import { NextResponse, type NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  if (!getSessionCookie(request)) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/sign-in';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
