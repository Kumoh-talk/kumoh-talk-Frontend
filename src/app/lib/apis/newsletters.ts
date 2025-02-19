const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

const _fetch = async (
  url: string,
  options: RequestInit,
  body?: string | any,
) => {
  if (body && typeof body !== 'string') {
    options.body = JSON.stringify(body);
  }
  return await fetch(url, options);
};

export const subscribe = (
  email: string,
  seminarContentNotice: boolean,
  studyNotice: boolean,
  projectNotice: boolean,
  mentoringNotice: boolean,
) => {
  return _fetch(
    `${baseUrl}/newsletters/subscribe`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
    {
      email,
      seminarContentNotice,
      studyNotice,
      projectNotice,
      mentoringNotice,
    },
  );
};
