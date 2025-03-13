import Comment from '@/app/components/common/comment/Comment';
import { CommentList as CommentListType } from '@/app/lib/types/comment/commentList';
import styles from './comment.module.scss';

export interface Props {
  userName?: string;
  userId: number;
  boardId: number;
  commentList: CommentListType;
}

export default function CommentList({
  userName,
  userId,
  boardId,
  commentList,
}: Props) {
  return (
    <div className={styles.commentList}>
      {commentList.commentInfoResponseList.map((comment) => (
        <Comment
          userName={userName}
          userId={userId}
          boardId={boardId}
          currentComment={comment}
          key={comment.commentId}
        />
      ))}
    </div>
  );
}
