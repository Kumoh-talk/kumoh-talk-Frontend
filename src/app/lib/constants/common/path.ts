export const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL as string;

export const END_POINTS = {
  PUBLISH: {
    CREATE_CHAT: (chatId: string) => `/app/streaming/${chatId}`,
  },
  SUBSCRIBE: {
    NEW_CHAT: (chatId: string) => `/chat/streaming/${chatId}`,
    NEW_QNA: (qnaId: string) => `/qna/streaming/${qnaId}`,
    DELETE_QNA: (qnaId: string) => `/qna/streaming/${qnaId}/delete`,
  },
};
