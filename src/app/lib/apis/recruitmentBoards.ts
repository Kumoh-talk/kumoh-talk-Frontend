import {
  RecruitmentByPageResponse,
  RecruitmentType,
  RemoveRecruitmentResponse,
} from '../types/recruitmentBoards/recruitmentBoards';

export const getRecruitmentArticlesByPage = async (
  category: RecruitmentType = 'MENTORING',
  page: number = 1,
  size: number = 15,
) => {
  try {
    const query = new URLSearchParams({
      recruitmentBoardType: category,
      size: size.toString(),
      page: page.toString(),
      sort: 'createdAt,DESC',
    });
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/recruitment-boards/page-num?${query.toString()}`,
    );
    const result = await response.json();

    if (response.ok && 'success' in result && 'data' in result) {
      return result.data as RecruitmentByPageResponse;
    } else {
      console.error('Failed to fetch data:', result);
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const getMyRecruitmentArticlesByPage = async (
  category: RecruitmentType = 'MENTORING',
  page: number = 1,
  size: number = 15,
  accessToken: string,
  refreshToken: string,
) => {
  try {
    const query = new URLSearchParams({
      recruitmentBoardType: category,
      size: size.toString(),
      page: page.toString(),
      sort: 'createdAt,DESC',
    });
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/recruitment-boards/my-boards?${query.toString()}`,
      {
        headers: {
          cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
        },
      },
    );
    const result = await response.json();

    if (response.ok && 'success' in result && 'data' in result) {
      return result.data as RecruitmentByPageResponse;
    } else {
      console.error('Failed to fetch data:', result);
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const removeRecruitmentArticle = async (recruitmentBoardId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/recruitment-boards/${recruitmentBoardId}`,
      {
        method: 'DELETE',
      },
    );
    const result = await response.json();

    if (response.ok) {
      return { success: true } as RemoveRecruitmentResponse;
    } else {
      console.error('Failed to fetch data:', result);
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
