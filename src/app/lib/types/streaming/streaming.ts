export type Streaming = {
  streamId: number;
  title: string;
  thumbnailUrl: string;
  viewers: number;
};

export type streamingDetail = {
  streamId: number;
  title: string;
  camUrl: string;
  slideUrl: string;
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

export type Caption = {
  duration: number;
  text: string;
};
