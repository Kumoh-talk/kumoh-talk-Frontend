'use server';

import { cookies } from 'next/headers';
import { postStreamKey } from '@/app/lib/apis/streaming/streamKey';

export async function createStreamKey() {
  const cookieStore = cookies();

  const response = await postStreamKey(cookieStore.toString());
  return response.data.streamKey;
}
