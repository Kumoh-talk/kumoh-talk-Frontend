export const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL as string;

export const END_POINTS = {
  PUBLISH: {
    CREATE_CHAT: (chatId: string) => `/app/streaming/${chatId}/add-chat`,
    CREATE_QNA: (qnaId: string) => `/app/streaming/${qnaId}/add-qna`,
    GET_QNA_LIST: (streamId: string) => `/app/streaming/${streamId}/qna-list`,
    LIKED_QNA: (streamId: string, qnaId: number) =>
      `/app/streaming/${streamId}/liked-qna/${qnaId}`,
    DELETE_QNA: (streamId: string, qnaId: number) =>
      `/app/streaming/${streamId}/delete-qna/${qnaId}`,
    VOTE_SELECT: (streamId: string, voteId: string) =>
      `/app/streaming/${streamId}/submit-vote/${voteId}`,
    VOTE_LIST_REQUEST: (streamId: string) =>
      `/app/streaming/${streamId}/vote-list`,
  },
  SUBSCRIBE: {
    GET_QNA_LIST: (sessionId: string) => `/streaming/qna-list/${sessionId}`,
    NEW_CHAT: (chatId: string) => `/streaming/chat/${chatId}/add`,
    NEW_QNA: (qnaId: string) => `/streaming/qna/${qnaId}/add`,
    LIKED_QNA: (streamId: string) => `/streaming/qna/${streamId}/liked`,
    DELETE_QNA: (streamId: string) => `/streaming/qna/${streamId}/delete`,
    VOTE_CURRENT: (sessionId: string) => `/streaming/vote-list/${sessionId}`,
    VOTE_CLOSE_AND_RESULT: (streamId: string) =>
      `/streaming/vote/${streamId}/close`,
    VOTE_CREATE: (streamId: string) => `/streaming/vote/${streamId}/add-vote`,
    CAPTION: '/streaming/caption',
    ERROR: (sessionId: string) => `/user/${sessionId}/queue/errors`,
  },
};
