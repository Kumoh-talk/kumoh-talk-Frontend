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

type VoteSelect = {
  selectId: number;
  content: string;
};

export type Vote = {
  voteId: number;
  title: string;
  multiple: boolean;
  selects: VoteSelect[];
};

type VoteCount = {
  selectId: number;
  count: number;
};

export type VoteResult = {
  voteId: number;
  voteCounts: VoteCount[];
};
