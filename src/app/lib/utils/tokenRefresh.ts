'use server';

import { cookies } from 'next/headers';
import { refreshToken as refreshTokenApi } from '../apis/user';

export async function tokenRefresh(accessToken: string, refreshToken: string) {
  const cookieStore = cookies();
  console.log(`액세스 토큰: ${accessToken}`);
  console.log(`리프레시 토큰: ${refreshToken}`);
  const res = await refreshTokenApi(accessToken, refreshToken);
  console.log(res);
  const body = await res.json();

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    body.data;
  cookieStore.set('accessToken', accessToken);
  cookieStore.set('refreshToken', refreshToken);

  return { newAccessToken, newRefreshToken };
}
