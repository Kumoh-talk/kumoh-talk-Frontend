export const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL as string;

export const END_POINTS = {
  PUBLISH: {
    CREATE_CHAT: (chatId: string) => `/app/streaming/${chatId}/add-chat`,
    CREATE_QNA: (qnaId: string) => `/app/streaming/${qnaId}/add-qna`,
    LIKED_QNA: (qnaId: string) => `/app/streaming/${qnaId}/liked-qna`,
    DELETE_QNA: (qnaId: string) => `/app/streaming/${qnaId}/delete-qna`,
  },
  SUBSCRIBE: {
    NEW_CHAT: (chatId: string) => `/chat/streaming/${chatId}/add`,
    NEW_QNA: (qnaId: string) => `/qna/streaming/${qnaId}/add`,
    LIKED_QNA: (qnaId: string) => `/qna/streaming/${qnaId}/liked`,
    DELETE_QNA: (qnaId: string) => `/qna/streaming/${qnaId}/delete`,
  },
};
