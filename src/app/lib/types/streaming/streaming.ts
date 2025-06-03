export type Streaming = {
  streamingId: number;
  title: string;
  subTitle: string;
  presenter: string;
  viewers: number;
};

export type Chat = {
  userId: number;
  nickname: string;
  content: string;
};

export type Qna = {
  qnaId: number;
  nickname: string;
  content: string;
  time: string;
  likes: number;
  anonymous: boolean;
};
