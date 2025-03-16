import { BoardArticle, BoardType } from '../types/board/board';

export const getBoardArticles = async (
  category: BoardType,
  page: number = 1,
  size: number = 15,
) => {
  try {
    const query = new URLSearchParams({
      boardType: category,
      size: size.toString(),
      page: page.toString(),
      sort: 'createdAt,DESC',
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/boards?${query.toString()}`,
    );
    const result = await response.json();

    if (response.ok && 'success' in result && 'data' in result) {
      return result.data.pageContents as BoardArticle[];
    } else {
      console.error('Failed to fetch data:', result);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const getMyBoardArticles = async (
  category: BoardType,
  page: number = 1,
  size: number = 15,
  accessToken: string,
  refreshToken: string,
) => {
  try {
    const query = new URLSearchParams({
      boardType: category,
      size: size.toString(),
      page: page.toString(),
      sort: 'createdAt,DESC',
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/boards/me?${query.toString()}`,
      {
        headers: {
          cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
        },
      },
    );
    const result = await response.json();

    if (response.ok && 'success' in result && 'data' in result) {
      return result.data.pageContents as BoardArticle[];
    } else {
      console.error('Failed to fetch data:', result);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
