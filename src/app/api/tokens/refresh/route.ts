import { _fetch } from '@/app/lib/utils/routeFunctions';
import { NextRequest, NextResponse } from 'next/server';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export async function POST(request: NextRequest) {
  const { accessToken, refreshToken } = await request.json();
  if (!accessToken || !refreshToken) {
    return NextResponse.json('Invalid tokens', { status: 400 });
  }

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
    return response;
  } catch (e) {
    return NextResponse.json('Invalid tokens', { status: 400 });
  }
}
