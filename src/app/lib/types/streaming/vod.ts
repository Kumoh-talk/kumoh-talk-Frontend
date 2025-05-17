export type Vod = {
  vodId: number;
  title: string;
  cam_url: string;
  slide_url: string;
  length: string;
  episode: number;
  summary: string;
  presenter: string;
  views: number;
};

export type Bookmark = {
  bookmarkId: number;
  userId: number;
  vodId: number;
  title: string;
  time: string;
};
