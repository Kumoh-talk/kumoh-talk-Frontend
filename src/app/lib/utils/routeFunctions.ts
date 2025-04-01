'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from '@/app/lib/apis/auth';
import { refreshToken } from '@/app/lib/apis/user';

export const convertCookieToHeaders = (cookies: string | null): HeadersInit =>
  cookies
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie(cookies, 'accessToken')}`,
      }
    : {
        'Content-Type': 'application/json',
      };

export const _fetch = async (
  url: string,
  options: RequestInit,
  body?: string | any,
) => {
  if (body && typeof body !== 'string') {
    options.body = JSON.stringify(body);
  }
  return await fetch(url, options);
};

export const setResponseCookie = (
  response: NextResponse,
  name: string,
  value: string,
) => {
  response.cookies.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14일
  });

  return response;
};

export const setResponseTokenCookie = (
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
) => {
  setResponseCookie(response, 'accessToken', accessToken);
  setResponseCookie(response, 'refreshToken', refreshToken);
};

export const refreshAndRetry = async (
  request: NextRequest,
  func: (
    request: NextRequest,
    params: any,
    isRefreshTokenEnabled: boolean,
  ) => Promise<NextResponse>,
  params: any,
  accessToken?: string,
  _refreshToken?: string,
) => {
  if (!accessToken || !_refreshToken) {
    return NextResponse.json({ status: 403 });
  }

  const newTokenRes = await refreshToken(accessToken, _refreshToken!);

  if (newTokenRes.status === 200) {
    const body = await newTokenRes.json();
    const tokenBody: {
      accessToken: string;
      refreshToken: string;
    } = body.data;

    const res2 = await func(request, params, false);

    setResponseCookie(res2, 'accessToken', tokenBody.accessToken);
    setResponseCookie(res2, 'refreshToken', tokenBody.refreshToken);
    return res2;
  } else {
    return NextResponse.json({ status: 403 });
  }
};
