'use server';

import { cookies } from 'next/headers';

export async function tokenRefresh(accessToken: string, refreshToken: string) {
  const cookieStore = cookies();
  cookieStore.set('accessToken', accessToken);
  cookieStore.set('refreshToken', refreshToken);

  const newAccessToken = cookieStore.get('accessToken')?.value;
  const newRefreshToken = cookieStore.get('refreshToken')?.value;

  return { newAccessToken, newRefreshToken };
}
