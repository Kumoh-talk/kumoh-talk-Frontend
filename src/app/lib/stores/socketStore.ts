import { CompatClient } from '@stomp/stompjs';
import { create, StateCreator } from 'zustand';
import { Chat, Qna } from '../types/streaming/streaming';

interface StompSlice {
  stompClient: CompatClient | null;
  setStompClient: (client: CompatClient | null) => void;
  socketId: number;
  setSocketId: (number: number) => void;
}

interface ChatSlice {
  chatMessageList: Chat[];
  addChatMessage: (chatMessage: Chat) => void;
}

interface QnaSlice {
  qnaList: Qna[];
  addQna: (newQna: Qna) => void;
  deleteQna: (qnaId: number) => void;
}

const createStompSlice: StateCreator<StompSlice, [], [], StompSlice> = (
  set
) => ({
  stompClient: null,
  setStompClient: (client) => set({ stompClient: client }),
  socketId: 0,
  setSocketId: (number) => set({ socketId: number }),
});

const createChatSlice: StateCreator<ChatSlice, [], [], ChatSlice> = (set) => ({
  chatMessageList: [],
  addChatMessage: (chatMessage) =>
    set((state) => ({
      chatMessageList: [...state.chatMessageList, chatMessage],
    })),
});

const createQnaSlice: StateCreator<QnaSlice, [], [], QnaSlice> = (set) => ({
  qnaList: [],
  addQna: (newQna: Qna) =>
    set((state) => ({ qnaList: [...state.qnaList, newQna] })),
  deleteQna: (qnaId: number) =>
    set((state) => ({
      qnaList: state.qnaList.filter((qna) => qna.qnaId !== qnaId),
    })),
});

interface SocketStore extends StompSlice, ChatSlice, QnaSlice {}

const useSocketStore = create<SocketStore>((...a) => ({
  ...createStompSlice(...a),
  ...createChatSlice(...a),
  ...createQnaSlice(...a),
}));

export default useSocketStore;
