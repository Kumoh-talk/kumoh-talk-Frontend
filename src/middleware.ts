import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const accessToken = nextUrl.searchParams.get('access-token');
  const refreshToken = nextUrl.searchParams.get('refresh-token');

  if (accessToken && refreshToken) {
    nextUrl.searchParams.delete('access-token');
    nextUrl.searchParams.delete('refresh-token');

    const response = NextResponse.redirect(nextUrl.toString(), {
      status: 302,
    });
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true, // xss 공격 방지
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
