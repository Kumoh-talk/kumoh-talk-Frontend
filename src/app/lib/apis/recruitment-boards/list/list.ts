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

export const getRecruitmentBoardApplicantList = (
  recruitmentBoardId: string,
  page: number,
  sort: string,
  cookie?: string
) => {
  return _fetch(
    `${baseUrl}/applications/recruitment/${recruitmentBoardId}?page=${page}&size=${10}&sort=${sort}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(cookie ? { Cookie: cookie ?? '' } : {}),
      },
      next: { revalidate: 30 },
      credentials: 'include',
    }
  );
};

export const getApplicantUserInfo = (userId: number, cookie?: string) => {
  return _fetch(`${baseUrl}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie ?? '' } : {}),
    },
    credentials: 'include',
  });
};

export const getApplicantDetail = (
  applicantId: string,
  recruitmentBoardId: string,
  cookie?: string
) => {
  return _fetch(
    `${baseUrl}/applications/recruitment/recruitmentBoardId/${Number(applicantId)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(cookie ? { Cookie: cookie ?? '' } : {}),
      },
      credentials: 'include',
    }
  );
};
