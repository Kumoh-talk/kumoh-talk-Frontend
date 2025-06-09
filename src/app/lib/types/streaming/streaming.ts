export type Streaming = {
  streamingId: number;
  title: string;
  subTitle: string;
  presenter: string;
  viewers: number;
};

export type Chat = {
  chatId: number;
  userId: number;
  nickname: string;
  content: string;
};

export type Qna = {
  qnaId: number;
  userId: number;
  nickname: string;
  content: string;
  likes: number;
  anonymous: boolean;
};
