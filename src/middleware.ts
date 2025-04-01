import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Role } from './app/lib/types/user/userInfo';
import jwt from 'jsonwebtoken';
import { refreshToken } from './app/lib/apis/user';
import { getCookie, parseJwt } from '@/app/lib/apis/auth';
import { setResponseCookie } from './app/lib/utils/routeFunctions';

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

  // 로그아웃 시
  const resLogout = checkLogout(request);
  if (resLogout) {
    return resLogout;
  }

  // 토큰 만료 체크
  const resCheckTokenExpired = await checkTokenExpired(request);
  if (resCheckTokenExpired) {
    return resCheckTokenExpired;
  }

  // 추가 정보 입력 필요 체크
  const resCheckNeedSubmitAdditionalInfo = await checkNeedSubmitAdditionalInfo(
    request,
  );
  if (resCheckNeedSubmitAdditionalInfo) {
    return resCheckNeedSubmitAdditionalInfo;
  }

  // 공지 사항 작성 권한 체크
  const resCheckAdminAccessForNoticePost =
    checkAdminAccessForNoticePost(request);
  if (resCheckAdminAccessForNoticePost) {
    return resCheckAdminAccessForNoticePost;
  }

  return NextResponse.next();
}

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
    return setResponseCookie(response, accessToken, refreshToken);
  } else {
    return null;
  }
};

const checkLogout = (request: NextRequest): NextResponse | null => {
  const { nextUrl } = request;

  const isLogout = nextUrl.searchParams.get('logout');

  if (isLogout) {
    nextUrl.searchParams.delete('logout');

    const response = NextResponse.redirect(nextUrl.toString(), {
      status: 302,
    });
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
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
      return setResponseCookie(
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

const checkNeedSubmitAdditionalInfo = async (
  request: NextRequest,
): Promise<NextResponse | null> => {
  const { nextUrl } = request;

  const isNeededAdditionalInfo = [
    '/recruitment-boards/post', // 멘토링/프로젝트/스터디 글 작성
    '/recruitment-boards/apply', // 멘토링/프로젝트/스터디 신청
    '/apply',
    '/post',
  ].includes(nextUrl.pathname);

  if (isNeededAdditionalInfo) {
    const cookies = request.headers.get('cookie')!;
    const accessToken = getCookie(cookies, 'accessToken')!;

    if (!accessToken) {
      // 로그인 안한 경우
      return null;
    }

    const { USER_ROLE: userRole, USER_ID: id } = parseJwt(accessToken);
    console.log(
      `[checkNeedSubmitAdditionalInfo] id: ${id}, userRole: ${userRole}`,
    );
    if (
      userRole === 'ROLE_ACTIVE_USER' ||
      userRole === 'ROLE_ADMIN' ||
      userRole === 'ROLE_SEMINAR_WRITER'
    ) {
      console.log(`[checkNeedSubmitAdditionalInfo] pass`);
      return null;
    }
    // if (userRole === 'ROLE_ACTIVE_USER' || userRole === 'ROLE_ADMIN' || userRole === 'ROLE_SEMINAR_WRITER') {
    //   // 어드민이면 수동으로 정보 체크
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/userAdditionalInfos/me`,
    //     {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         cookie: cookies,
    //       },
    //     },
    //   );
    //   const data = await res.json();
    //   if (data.success == 'true') {
    //     return null;
    //   }
    // }
    const redirect = new URLSearchParams({
      redirect: nextUrl.pathname + nextUrl.search,
    });

    const url = new URL('/info-form?' + redirect.toString(), request.url);

    console.log(`[checkNeedSubmitAdditionalInfo] redirected`);
    return NextResponse.redirect(url, {
      status: 302,
    });
  } else {
    return null;
  }
};

const checkAdminAccessForNoticePost = (
  request: NextRequest,
): NextResponse | null => {
  const { nextUrl } = request;

  if (
    nextUrl.pathname === '/post' &&
    nextUrl.searchParams.get('type') === 'notice'
  ) {
    const cookies = request.headers.get('cookie')!;
    const accessToken = getCookie(cookies, 'accessToken')!;

    if (!accessToken) return null;

    const { USER_ROLE: userRole } = parseJwt(accessToken);

    if (userRole !== 'ROLE_ADMIN') {
      const homeUrl = new URL('/', request.url);

      return NextResponse.redirect(homeUrl, {
        status: 302,
      });
    }
  }

  return null;
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
