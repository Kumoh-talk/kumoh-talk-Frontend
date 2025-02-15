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
    console.error(error);
    return error;
  }
};

export const getMyProfile = () => {
  return _fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    cache: 'no-store',
  });
};

export const getAdditionalInfo = () => {
  return _fetch(`${baseUrl}/userAdditionalInfos/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const getPresignedURL = (fileName: string) => {
  return _fetch(
    `${baseUrl}/users/files/presigned-url`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
    { fileName, fileType: 'IMAGE' }
  );
};

export const uploadProfileImage = (url: string, image: File) => {
  return fetch(url, {
    method: 'PUT',
    body: image,
    headers: { 'Content-Type': image.type },
  });
};

export const patchProfileImage = (requestUrl: string) => {
  const url = requestUrl.split('?')[0];
  console.log(`유알엘: ${url}`);
  return _fetch(
    `${baseUrl}/users/files/profile`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
    { url }
  );
};

export const deleteProfileImage = () => {
  return _fetch(`${baseUrl}/users/files/profile`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const patchUserNickname = (nickname: string) => {
  return _fetch(
    `${baseUrl}/users/me/nickname`,
    {
      method: 'PATCH',
      headers: {
        Content_type: 'application/json',
      },
      credentials: 'include',
    },
    { nickname }
  );
};
