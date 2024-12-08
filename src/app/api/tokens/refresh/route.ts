import { getCookie } from '@/app/lib/apis/auth';
import { NextRequest, NextResponse } from 'next/server';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

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

export async function POST(request: NextRequest) {
  console.log('POST /api/tokens/refresh123123');
  const { accessToken, refreshToken } = await request.json();
  if (!accessToken || !refreshToken) {
    return NextResponse.json('Invalid tokens', { status: 400 });
  }

  console.log(accessToken, refreshToken);

  try {
    //check if accessToken and refreshToken are valid
    if (!accessToken || !refreshToken) {
      return NextResponse.json('Invalid tokens', { status: 400 });
    }

    const res = await _fetch(
      `${baseUrl}/tokens/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      { accessToken, refreshToken },
    );

    const data = await res.json();
    const response = NextResponse.json(data, { status: res.status });

    if (res.status === 200) {
      response.cookies.set('accessToken', data.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
      response.cookies.set('refreshToken', data.data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
    }

    console.log(res.status, data, response.cookies)

    return response;
  } catch (e) {
    return NextResponse.json('Invalid tokens', { status: 400 });
  }
}
