import { NextRequest, NextResponse } from 'next/server';
import { getCookie, parseJwt } from '@/app/lib/apis/auth';
import {
  _fetch,
  convertCookieToHeaders,
  refreshAndRetry,
  setResponseTokenCookie,
} from '@/app/lib/utils/routeFunctions';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export async function GET(
  request: NextRequest,
  { params }: { params: { domain: string } },
  isRefreshTokenEnabled = true,
): Promise<NextResponse> {
  const cookies = request.headers.get('cookie');
  const headers = convertCookieToHeaders(cookies);

  const searchParams = request.nextUrl.searchParams;

  if (cookies && getCookie(cookies, 'accessToken')) {
    const accessToken = getCookie(cookies, 'accessToken')!;
    const { USER_ID: userId } = parseJwt(accessToken);
    searchParams.append('userId', '' + userId);
  }

  const res = await _fetch(
    `${baseUrl}/${params.domain}?${searchParams.toString()}`,
    {
      method: 'GET',
      headers,
    },
  );
  const body = await res.json();

  // 토큰 만료
  if (
    isRefreshTokenEnabled &&
    cookies &&
    getCookie(cookies, 'accessToken') &&
    res.status === 401
  ) {
    console.log('Token expired, refreshing token');
    return refreshAndRetry(
      request,
      GET,
      { params },
      getCookie(cookies!, 'accessToken')!,
      getCookie(cookies!, 'refreshToken')!,
    );
  }

  return NextResponse.json(body, { status: res.status });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { domain: string } },
  isRefreshTokenEnabled = true,
): Promise<NextResponse> {
  const cookies = request.headers.get('cookie');
  const headers = convertCookieToHeaders(cookies);

  const searchParams = request.nextUrl.searchParams;

  if (cookies && getCookie(cookies, 'accessToken')) {
    const accessToken = getCookie(cookies, 'accessToken')!;
    const { USER_ID: userId } = parseJwt(accessToken);
    searchParams.append('userId', '' + userId);
  }

  const res = await _fetch(
    `${baseUrl}/${params.domain}?${searchParams.toString()}`,
    {
      method: 'POST',
      headers,
    },
    await request.json(),
  );

  // 토큰 만료
  if (
    isRefreshTokenEnabled &&
    cookies &&
    getCookie(cookies, 'accessToken') &&
    res.status === 401
  ) {
    console.log('Token expired, refreshing token');
    return refreshAndRetry(
      request,
      POST,
      { params },
      getCookie(cookies!, 'accessToken')!,
      getCookie(cookies!, 'refreshToken')!,
    );
  }

  const resBody = await res.json();
  const response = NextResponse.json(resBody, { status: res.status });
  if (resBody.data?.accessToken) {
    setResponseTokenCookie(
      response,
      resBody.data.accessToken,
      resBody.data.refreshToken,
    );
  }

  return response;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { domain: string } },
  isRefreshTokenEnabled = true,
): Promise<NextResponse> {
  const cookies = request.headers.get('cookie');
  const headers = convertCookieToHeaders(cookies);

  const searchParams = request.nextUrl.searchParams;

  if (cookies && getCookie(cookies, 'accessToken')) {
    const accessToken = getCookie(cookies, 'accessToken')!;
    const { USER_ID: userId } = parseJwt(accessToken);
    searchParams.append('userId', '' + userId);
  }

  const res = await _fetch(
    `${baseUrl}/${params.domain}?${searchParams.toString()}`,
    {
      method: 'PUT',
      headers,
    },
    await request.json(),
  );

  // 토큰 만료
  if (
    isRefreshTokenEnabled &&
    cookies &&
    getCookie(cookies, 'accessToken') &&
    res.status === 401
  ) {
    console.log('Token expired, refreshing token');
    return refreshAndRetry(
      request,
      PUT,
      { params },
      getCookie(cookies!, 'accessToken')!,
      getCookie(cookies!, 'refreshToken')!,
    );
  }

  return NextResponse.json(await res.json(), { status: res.status });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { domain: string } },
  isRefreshTokenEnabled = true,
): Promise<NextResponse> {
  const cookies = request.headers.get('cookie');
  const headers = convertCookieToHeaders(cookies);

  const searchParams = request.nextUrl.searchParams;

  if (cookies && getCookie(cookies, 'accessToken')) {
    const accessToken = getCookie(cookies, 'accessToken')!;
    const { USER_ID: userId } = parseJwt(accessToken);
    searchParams.append('userId', '' + userId);
  }

  const res = await _fetch(
    `${baseUrl}/${params.domain}?${searchParams.toString()}`,
    {
      method: 'PATCH',
      headers,
    },
    await request.json(),
  );

  const resBody = await res.json();
  console.log(res.status, resBody);

  // 토큰 만료
  if (
    isRefreshTokenEnabled &&
    cookies &&
    getCookie(cookies, 'accessToken') &&
    res.status === 401
  ) {
    console.log('Token expired, refreshing token');
    return refreshAndRetry(
      request,
      PATCH,
      { params },
      getCookie(cookies!, 'accessToken')!,
      getCookie(cookies!, 'refreshToken')!,
    );
  }

  const response = NextResponse.json(resBody, { status: res.status });
  if (resBody.data?.accessToken) {
    setResponseTokenCookie(
      response,
      resBody.data.accessToken,
      resBody.data.refreshToken,
    );
  }

  return response;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { domain: string } },
  isRefreshTokenEnabled = true,
): Promise<NextResponse> {
  const cookies = request.headers.get('cookie');
  const headers = convertCookieToHeaders(cookies);

  const searchParams = request.nextUrl.searchParams;

  if (cookies && getCookie(cookies, 'accessToken')) {
    const accessToken = getCookie(cookies, 'accessToken')!;
    const { USER_ID: userId } = parseJwt(accessToken);
    searchParams.append('userId', '' + userId);
  }

  const res = await _fetch(
    `${baseUrl}/${params.domain}?${searchParams.toString()}`,
    {
      method: 'DELETE',
      headers,
    },
  );

  // 토큰 만료
  if (
    isRefreshTokenEnabled &&
    cookies &&
    getCookie(cookies, 'accessToken') &&
    res.status === 401
  ) {
    console.log('Token expired, refreshing token');
    return refreshAndRetry(
      request,
      DELETE,
      { params },
      getCookie(cookies!, 'accessToken')!,
      getCookie(cookies!, 'refreshToken')!,
    );
  }

  return NextResponse.json(await res.json(), { status: res.status });
}
