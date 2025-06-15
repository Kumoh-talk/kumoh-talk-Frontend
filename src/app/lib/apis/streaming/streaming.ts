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

export const getStreamingList = async (cookie?: string) => {
  return _fetch(`${baseUrl}/stream/list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie ?? '' } : {}),
    },
    credentials: 'include',
  });
};

export const getStreamingDetail = async (streamId: string, cookie?: string) => {
  return _fetch(`${baseUrl}/stream/${streamId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie ?? '' } : {}),
    },
    credentials: 'include',
  });
};
