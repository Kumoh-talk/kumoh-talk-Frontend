export type BoardType = 'SEMINAR' | 'NOTICE';

export type BoardQueries = {
  boardType: BoardType;
  page?: number;
  size?: number;
  sort?: string;
};

export type BoardArticle = {
  boardId: number; // articleId
  title: string;
  userName: string;
  boardTag: BoardType;
  view: number;
  like: number;
  headImageUrl: string;
  createdAt: string;
};
