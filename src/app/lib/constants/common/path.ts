export const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL as string;

export const END_POINTS = {
  PUBLISH: {
    CREATE_CHAT: (chatId: string) => `/app/streaming/${chatId}/add-chat`,
    CREATE_QNA: (qnaId: string) => `/app/streaming/${qnaId}/add-qna`,
    LIKED_QNA: (streamId: string, qnaId: number) =>
      `/app/streaming/${streamId}/liked-qna/${qnaId}`,
    DELETE_QNA: (streamId: string, qnaId: number) =>
      `/app/streaming/${streamId}/delete-qna/${qnaId}`,
  },
  SUBSCRIBE: {
    NEW_CHAT: (chatId: string) => `/streaming/chat/${chatId}/add`,
    NEW_QNA: (qnaId: string) => `/streaming/qna/${qnaId}/add`,
    LIKED_QNA: (streamId: string) => `/streaming/qna/${streamId}/liked`,
    DELETE_QNA: (streamId: string) => `/streaming/qna/${streamId}/delete`,
    ERROR: (sessionId: string) => `/user/${sessionId}/queue/errors`,
  },
};
