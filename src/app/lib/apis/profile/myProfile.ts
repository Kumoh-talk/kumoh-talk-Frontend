const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

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
    console.error(error);
    return error;
  }
};

export const getMyProfile = () => {
  return _fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN as string,
    },
    credentials: 'include',
  });
};

export const getAdditionalInfo = (userId: number) => {
  return _fetch(`${baseUrl}/userAdditionalInfos/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN as string,
    },
    credentials: 'include',
  });
};
