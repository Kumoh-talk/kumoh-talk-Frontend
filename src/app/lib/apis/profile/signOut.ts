'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function handleUnlink(provider: string) {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');

  redirect(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/users/oauth2/${provider.toLowerCase()}?redirect-uri=${
      process.env.NEXT_PUBLIC_BASE_URL
    }&mode=unlink`
  );
}
