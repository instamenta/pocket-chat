import { NextFetchEvent, NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { JWT } from '@/lib/variables';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export function middleware(r: NextRequest, event: NextFetchEvent) {
  const response = NextResponse.next();
  return response;
}
