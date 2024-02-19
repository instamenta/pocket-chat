import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { JWT } from '@/lib/variables';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

const guest_only_routes = ['/', '/auth', '/auth/sign-in', '/auth/sign-up'];

export function middleware(req: NextRequest) {
  const nextUrl = req.nextUrl.clone();

  //* Redirect Authenticated users from accessing the Landing page.
  if (guest_only_routes.includes(nextUrl.pathname)) {
    const isAuthenticated = req.cookies.get(JWT.token_name);
    if (isAuthenticated) {
      nextUrl.pathname = '/feed';
      return NextResponse.redirect(nextUrl);
    }
    return NextResponse.next();
  }

  //* Redirect unauthenticated users.
  const isAuthenticated = req.cookies.get(JWT.token_name);
  if (!isAuthenticated) {
    nextUrl.pathname = '/auth';
    return NextResponse.redirect(nextUrl);
  }

  return NextResponse.next();
}
