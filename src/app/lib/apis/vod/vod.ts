const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/streaming`;

const _fetch = async (
  url: string,
  options: RequestInit,
  body?: string | any
) => {
  if (body && typeof body !== 'string') {
    options.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(JSON.stringify(await response.json()));
    }

    return await response.json();
  } catch (error) {
    return error;
  }
};

export const getVodList = async (cookie?: string) => {
  return _fetch(`${baseUrl}/vod`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie ?? '' } : {}),
    },
    next: { revalidate: 30 },
    credentials: 'include',
  });
};

export const getVodDetail = async (vodId: string, cookie?: string) => {
  return _fetch(`${baseUrl}/vod/${vodId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie ?? '' } : {}),
    },
    credentials: 'include',
  });
};

export const postBookmark = async (
  title: string,
  time: string,
  cookie?: string
) => {
  return _fetch(
    `${baseUrl}/북마크 등록 경로`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cookie ? { Cookie: cookie ?? '' } : {}),
      },
    },
    {
      title,
      time,
    }
  );
};
