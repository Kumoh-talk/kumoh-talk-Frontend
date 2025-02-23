import { NextRequest, NextResponse } from 'next/server';
import { getCookie, parseJwt } from '@/app/lib/apis/auth';
import { refreshToken } from '@/app/lib/apis/user';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

type UrlParams = { domain: string; func1: string; func2: string };

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
    } = body.data;

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
  { params }: { params: UrlParams },
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
    `${baseUrl}/${params.domain}/${params.func1}/${params.func2}?${searchParams.toString()}`,
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
  { params }: { params: UrlParams },
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
    `${baseUrl}/${params.domain}/${params.func1}/${params.func2}?${searchParams.toString()}`,
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
      POST,
      { params },
      getCookie(cookies!, 'accessToken')!,
      getCookie(cookies!, 'refreshToken')!,
    );
  }

  return NextResponse.json(await res.json(), { status: res.status });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: UrlParams },
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
    `${baseUrl}/${params.domain}/${params.func1}/${params.func2}?${searchParams.toString()}`,
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
  { params }: { params: UrlParams },
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
    `${baseUrl}/${params.domain}/${params.func1}/${params.func2}?${searchParams.toString()}`,
    {
      method: 'PATCH',
      headers,
    },
    await request.json(),
  );

  const resBody = await res.json();
  console.log(res.status, resBody);

  // 토큰 만료
  if (res.status === 401) {
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
    response.cookies.set('accessToken', resBody.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    response.cookies.set('refreshToken', resBody.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
  }

  return response;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: UrlParams },
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
    `${baseUrl}/${params.domain}/${params.func1}/${params.func2}?${searchParams.toString()}`,
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
      DELETE,
      { params },
      getCookie(cookies!, 'accessToken')!,
      getCookie(cookies!, 'refreshToken')!,
    );
  }

  return NextResponse.json(await res.json(), { status: res.status });
}
