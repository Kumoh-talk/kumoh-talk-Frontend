const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

const _fetch = async (
  url: string,
  options: RequestInit,
  body?: string | any
) => {
  if (body && typeof body !== 'string') {
    options.body = JSON.stringify(body);
  }
  return await fetch(url, options);
};

export const refreshToken = (accessToken: string, refreshToken: string) => {
  return _fetch(
    `${baseUrl}/tokens/refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { accessToken, refreshToken }
  );
};

export const checkNickname = async (nickname: string) => {
  return _fetch(
    `${baseUrl}/users/check-nickname?nickname=${encodeURIComponent(nickname)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  );
};

export const completeRegistration = (nickname: string, name: string) => {
  return _fetch(
    `${baseUrl}/users/complete-registration`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
    {
      nickname,
      name,
    }
  );
};

export const logout = () => {
  return _fetch(`${baseUrl}/users/logout`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const getUserInfo = (cookie?: string) => {
  return _fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie ?? '' } : {}),
    },
    credentials: 'include',
  });
};
