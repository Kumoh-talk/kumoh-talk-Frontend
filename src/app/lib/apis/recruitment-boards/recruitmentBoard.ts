import { RecruitmentBoardsApi } from '../../types/recruitmentBoards/recruitmentBoards';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export const matchRecruitmentTitle = (recruitmentBoardType: string) => {
  const typeObj: {
    [key: string]: string;
  } = {
    study: '스터디',
    project: '프로젝트',
    mentoring: '멘토링',
  };
  return typeObj[recruitmentBoardType];
};

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
      throw new Error(JSON.stringify(response));
    }

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getRecruitmentBoardDetail = (recruitmentBoardId: string) => {
  return _fetch(`${baseUrl}/recruitment-boards/${recruitmentBoardId}/board`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};
