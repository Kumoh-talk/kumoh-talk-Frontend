export type Streaming = {
  streamingId: number;
  title: string;
  subTitle: string;
  presenter: string;
  viewers: number;
};

export type Chat = {
  chatId: number;
  socketId: number;
  name: string;
  content: string;
  time: string;
};

export type Qna = {
  qnaId: number;
  name: string;
  content: string;
  time: string;
  likes: number;
  isAnswered: boolean;
};
