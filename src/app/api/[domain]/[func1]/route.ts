import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from '@/app/lib/apis/auth';
import { refreshToken } from '@/app/lib/apis/user';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

const convertCookieToHeaders = (cookies: string | null): HeadersInit =>
  cookies
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie(cookies, 'accessToken')}`,
      }
    : {
        'Content-Type': 'application/json',
      };

const _fetch = async (
  url: string,
  options: RequestInit,
  body?: string | any,
) => {
  if (body && typeof body !== 'string') {
    options.body = JSON.stringify(body);
  }
  return await fetch(url, options);
};

const refreshAndRetry = async (
  request: NextRequest,
  func: (request: NextRequest, params: any) => Promise<NextResponse>,
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
    } = body;
    request.headers.set(
      'cookies',
      `accessToken=${tokenBody.accessToken}; refreshToken=${tokenBody.refreshToken}`,
    );

    const res2 = await func(request, params);

    res2.cookies.set('accessToken', tokenBody.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    res2.cookies.set('refreshToken', tokenBody.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    return res2;
  } else {
    return NextResponse.json({ status: 403 });
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { domain: string; func1: string } },
): Promise<NextResponse> {
  const cookies = request.headers.get('cookie');
  const headers = convertCookieToHeaders(cookies);

  const searchParams = request.nextUrl.searchParams;

  const res = await _fetch(
    `${baseUrl}/${params.domain}/${params.func1}?${searchParams.toString()}`,
    {
      method: 'GET',
      headers,
    },
  );
  const body = await res.json();

  // 토큰 만료
  if (res.status === 401) {
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
  { params }: { params: { domain: string; func1: string } },
): Promise<NextResponse> {
  const cookies = request.headers.get('cookie');
  const headers = convertCookieToHeaders(cookies);

  const searchParams = request.nextUrl.searchParams;

  const res = await _fetch(
    `${baseUrl}/${params.domain}/${params.func1}?${searchParams.toString()}`,
    {
      method: 'POST',
      headers,
    },
    await request.json(),
  );

  // 토큰 만료
  if (res.status === 401) {
    console.log('Token expired, refreshing token');
    return refreshAndRetry(
      request,
      GET,
      { params },
      getCookie(cookies!, 'accessToken')!,
      getCookie(cookies!, 'refreshToken')!,
    );
  }

  return NextResponse.json(await res.json(), { status: res.status });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { domain: string; func1: string } },
): Promise<NextResponse> {
  const cookies = request.headers.get('cookie');
  const headers = convertCookieToHeaders(cookies);

  const searchParams = request.nextUrl.searchParams;

  const res = await _fetch(
    `${baseUrl}/${params.domain}/${params.func1}?${searchParams.toString()}`,
    {
      method: 'PUT',
      headers,
    },
    await request.json(),
  );

  // 토큰 만료
  if (res.status === 401) {
    console.log('Token expired, refreshing token');
    return refreshAndRetry(
      request,
      GET,
      { params },
      getCookie(cookies!, 'accessToken')!,
      getCookie(cookies!, 'refreshToken')!,
    );
  }

  return NextResponse.json(await res.json(), { status: res.status });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { domain: string; func1: string } },
): Promise<NextResponse> {
  const cookies = request.headers.get('cookie');
  const headers = convertCookieToHeaders(cookies);

  const searchParams = request.nextUrl.searchParams;

  const res = await _fetch(
    `${baseUrl}/${params.domain}/${params.func1}?${searchParams.toString()}`,
    {
      method: 'PATCH',
      headers,
    },
    await request.json(),
  );

  // 토큰 만료
  if (res.status === 401) {
    console.log('Token expired, refreshing token');
    return refreshAndRetry(
      request,
      GET,
      { params },
      getCookie(cookies!, 'accessToken')!,
      getCookie(cookies!, 'refreshToken')!,
    );
  }

  return NextResponse.json(await res.json(), { status: res.status });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { domain: string; func1: string } },
): Promise<NextResponse> {
  const cookies = request.headers.get('cookie');
  const headers = convertCookieToHeaders(cookies);

  const searchParams = request.nextUrl.searchParams;

  const res = await _fetch(
    `${baseUrl}/${params.domain}/${params.func1}?${searchParams.toString()}`,
    {
      method: 'DELETE',
      headers,
    },
  );

  // 토큰 만료
  if (res.status === 401) {
    console.log('Token expired, refreshing token');
    return refreshAndRetry(
      request,
      GET,
      { params },
      getCookie(cookies!, 'accessToken')!,
      getCookie(cookies!, 'refreshToken')!,
    );
  }

  return NextResponse.json(await res.json(), { status: res.status });
}