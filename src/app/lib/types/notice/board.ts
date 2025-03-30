export type BoardType = 'SEMINAR' | 'NOTICE';

export type BoardSort = 'DESC' | 'ASC';

export interface BoardSearchParams {
  searchParams: {
    page?: string;
    sort?: BoardSort;
  };
}
