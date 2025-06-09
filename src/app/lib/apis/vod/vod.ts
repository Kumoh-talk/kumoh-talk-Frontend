const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

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

export const getVodList = async () => {
  return _fetch(`${baseUrl}/vod`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const getVodDetail = async (vodId: string) => {
  return _fetch(`${baseUrl}/vod/${vodId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};
