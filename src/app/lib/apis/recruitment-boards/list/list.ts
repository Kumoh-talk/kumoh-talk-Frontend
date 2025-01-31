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

export const getRecruitmentBoardApplicantList = (
  recruitmentBoardId: string,
  page: number,
  sort: string
) => {
  return _fetch(
    `${baseUrl}/applications/recruitment/${recruitmentBoardId}?page=${page}&size=${10}&sort=${sort}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  );
};

export const getApplicantUserInfo = (userId: number) => {
  return _fetch(`${baseUrl}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const getApplicantDetail = (
  applicantId: string,
  recruitmentBoardId: string
) => {
  return _fetch(
    `${baseUrl}/applications/recruitment/${recruitmentBoardId}/${applicantId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  );
};
