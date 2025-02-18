import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Role } from './app/lib/types/user/userInfo';
import jwt from 'jsonwebtoken';
import { refreshToken } from './app/lib/apis/user';

interface AccessToken {
  USER_ID: number;
  USER_ROLE: Role;
  iat: number;
  exp: number;
}

export async function middleware(request: NextRequest) {
  // 로그인 시
  const resLogin = checkLoginSuccess(request);
  if (resLogin) {
    return resLogin;
  }

  const resCheckTokenExpired = await checkTokenExpired(request);
  if (resCheckTokenExpired) {
    return resCheckTokenExpired;
  }

  return NextResponse.next();
}

const setCookieIntoResponse = (
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
): NextResponse => {
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
};

const checkLoginSuccess = (request: NextRequest): NextResponse | null => {
  const { nextUrl } = request;

  const accessToken = nextUrl.searchParams.get('access-token');
  const refreshToken = nextUrl.searchParams.get('refresh-token');

  if (accessToken && refreshToken) {
    nextUrl.searchParams.delete('access-token');
    nextUrl.searchParams.delete('refresh-token');

    const response = NextResponse.redirect(nextUrl.toString(), {
      status: 302,
    });
    return setCookieIntoResponse(response, accessToken, refreshToken);
  } else {
    return null;
  }
};

const isTokenExpired = (accessToken: string): boolean => {
  try {
    const decoded = jwt.decode(accessToken) as AccessToken | null;
    if (!decoded) {
      console.error('[isTokenExpired] Invalid token');
      return true;
    }

    const now = new Date().getTime() / 1000;
    return now > decoded.exp;
  } catch (err) {
    console.error(`[isTokenExpired] ${err}`);
    return true;
  }
};

const checkTokenExpired = async (
  request: NextRequest,
): Promise<NextResponse | null> => {
  const accessToken = request.cookies.get('accessToken');
  const _refreshToken = request.cookies.get('refreshToken');

  if (accessToken && _refreshToken && isTokenExpired(accessToken.value)) {
    try {
      const res = await refreshToken(accessToken.value, _refreshToken.value);
      if (res.status !== 200) {
        throw new Error('Invalid tokens');
      }

      const data = (await res.json()).data;
      request.cookies.set('accessToken', data.accessToken);
      request.cookies.set('refreshToken', data.refreshToken);

      const response = NextResponse.redirect(
        new URL(request.nextUrl.pathname, request.url),
      );
      return setCookieIntoResponse(
        response,
        data.accessToken,
        data.refreshToken,
      );
    } catch (err) {
      console.error(`[checkTokenExpired] 토큰 재발급 실패 ${err}`);
      const res = NextResponse.redirect(request.nextUrl.toString(), {
        status: 302,
      });
      res.cookies.delete('accessToken');
      res.cookies.delete('refreshToken');
      return res;
    }
  }
  return null;
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
