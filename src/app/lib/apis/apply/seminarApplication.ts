const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

const _fetch = async (
  url: string,
  options: RequestInit,
  body?: string | any
) => {
  if (body && typeof body !== 'string') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  return response.json();
};

const getMyInformation = () => {
  return _fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

const getUsername = async () => {
  const response = await getMyInformation();
  const { name } = response.data;

  return name;
};
