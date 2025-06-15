import { CompatClient } from '@stomp/stompjs';
import { create, StateCreator } from 'zustand';
import {
  Caption,
  Chat,
  Qna,
  Vote,
  VoteResult,
} from '../types/streaming/streaming';

interface StompSlice {
  stompClient: CompatClient | null;
  setStompClient: (client: CompatClient | null) => void;
  streamId: number;
  setStreamId: (number: number) => void;
}

const createStompSlice: StateCreator<StompSlice, [], [], StompSlice> = (
  set
) => ({
  stompClient: null,
  setStompClient: (client) => set({ stompClient: client }),
  streamId: 0,
  setStreamId: (number) => set({ streamId: number }),
});

interface ChatSlice {
  chatMessageList: Chat[];
  addChatMessage: (chatMessage: Chat) => void;
}

const createChatSlice: StateCreator<ChatSlice, [], [], ChatSlice> = (set) => ({
  chatMessageList: [],
  addChatMessage: (chatMessage) =>
    set((state) => ({
      chatMessageList: [...state.chatMessageList, chatMessage],
    })),
});

interface QnaSlice {
  qnaList: Qna[];
  setQnaList: (qnaList: Qna[]) => void;
  addQna: (newQna: Qna) => void;
  likeQna: (qnaId: number) => void;
  myLikedQna: number[];
  deleteQna: (qnaId: number) => void;
}

const createQnaSlice: StateCreator<QnaSlice, [], [], QnaSlice> = (set) => ({
  qnaList: [],
  setQnaList: (qnaList: Qna[]) => set(() => ({ qnaList })),
  addQna: (newQna: Qna) =>
    set((state) => ({ qnaList: [...state.qnaList, newQna] })),
  likeQna: (qnaId: number) =>
    set((state) => ({
      qnaList: state.qnaList
        .map((qna) =>
          qna.qnaId === qnaId ? { ...qna, likes: qna.likes + 1 } : qna
        )
        .sort((a, b) => b.likes - a.likes),
    })),
  myLikedQna: [],
  deleteQna: (qnaId: number) =>
    set((state) => ({
      qnaList: state.qnaList.filter((qna) => qna.qnaId !== qnaId),
    })),
});

interface VoteSlice {
  vote: Vote;
  setVote: (vote: Vote) => void;
  isVoteShow: boolean;
  setIsVoteShow: (isVoteShow: boolean) => void;
  isSelected: boolean;
  setIsSelected: (isSelected: boolean) => void;
  isVoteFinished: boolean;
  setIsVoteFinished: (isFinished: boolean) => void;
  voteResult: VoteResult;
  setVoteResult: (voteResult: VoteResult) => void;
}

const createVoteSlice: StateCreator<VoteSlice, [], [], VoteSlice> = (set) => ({
  vote: {
    voteId: 0,
    title: '',
    multiple: false,
    selects: [],
  },
  setVote: (vote) =>
    set(() => ({
      vote,
    })),
  isVoteShow: false,
  setIsVoteShow: (isVoteShow) => set(() => ({ isVoteShow })),
  isSelected: false,
  setIsSelected: (isSelected) => set(() => ({ isSelected })),
  isVoteFinished: true,
  setIsVoteFinished: (isFinished) =>
    set(() => ({ isVoteFinished: isFinished })),
  voteResult: {
    voteId: 0,
    voteCounts: [],
  },
  setVoteResult: (voteResult) => set(() => ({ voteResult })),
});

interface CaptionSlice {
  caption: Caption;
  setCaption: (caption: Caption) => void;
}

const createCaptionSlice: StateCreator<CaptionSlice, [], [], CaptionSlice> = (
  set
) => ({
  caption: {
    duration: 0,
    text: '',
  },
  setCaption: (caption) => set(() => ({ caption })),
});

interface SummarySlice {
  summary: string;
  setSummary: (summary: string) => void;
}

const createSummarySlice: StateCreator<SummarySlice, [], [], SummarySlice> = (
  set
) => ({
  summary: '',
  setSummary: (summary) => set(() => ({ summary })),
});

interface TitleSlice {
  title: string;
  setTitle: (title: string) => void;
}

const createTitleSlice: StateCreator<TitleSlice, [], [], TitleSlice> = (
  set
) => ({
  title: '',
  setTitle: (title) => set(() => ({ title })),
});

interface SocketStore
  extends StompSlice,
    ChatSlice,
    QnaSlice,
    VoteSlice,
    CaptionSlice,
    SummarySlice,
    TitleSlice {}

const useSocketStore = create<SocketStore>((...a) => ({
  ...createStompSlice(...a),
  ...createChatSlice(...a),
  ...createQnaSlice(...a),
  ...createVoteSlice(...a),
  ...createCaptionSlice(...a),
  ...createSummarySlice(...a),
  ...createTitleSlice(...a),
}));

export default useSocketStore;
