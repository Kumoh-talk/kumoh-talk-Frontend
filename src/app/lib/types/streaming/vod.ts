export type Vod = {
  vodId: number;
  title: string;
  thumbnailUrl: string;
  length: string;
  views: number;
};

export type VodDetail = {
  title: string;
  slideUrl: string;
  slideTsQuery: string;
  camUrl: string;
  camTsQuery: string;
  bookmarks: string;
};

export type Bookmark = {
  bookmarkId: number;
  userId: number;
  vodId: number;
  title: string;
  time: string;
};
