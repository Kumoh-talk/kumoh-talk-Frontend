'use server';

import { revalidatePath } from 'next/cache';
import { postBookmark } from '../apis/vod/vod';
import { cookies } from 'next/headers';

export async function bookmarkPostAction(formData: FormData) {
  const vodId = formData.get('vodId')?.toString();
  const title = formData.get('title')?.toString();
  const time = formData.get('time')?.toString();
  const cookieStore = cookies();
  console.log(`폼 데이따: ${formData} ㅋㅋ`);
  console.log(`타이틀: ${title} ㅋㅋ`);

  if (!title || !time) {
    return;
  }

  try {
    const response = await postBookmark(title, time, cookieStore.toString());
    console.log(response.data);
    revalidatePath(`/vod-list/${vodId}`);
  } catch (err) {
    console.error(err);
  }
}
