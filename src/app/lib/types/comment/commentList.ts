export interface CommentListApi {
  success: string;
  data: CommentList;
}

export interface CommentList {
  commentsCount: number;
  commentInfoResponseList: CommentInfoResponseList[];
}

export interface CommentInfoResponseList {
  commentId: number;
  groupId: number;
  userNickname: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  replyComments: CommentInfoResponseList[];
}

export interface Comment {
  content: string;
  groupId: number | null;
}
