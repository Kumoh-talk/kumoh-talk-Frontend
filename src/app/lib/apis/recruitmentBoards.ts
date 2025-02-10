import {
  RecruitmentArticle,
  RecruitmentType,
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
      return result.data.boardInfo as RecruitmentArticle[];
    } else {
      console.error('Failed to fetch data:', result);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
