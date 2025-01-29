import Comment from '@/app/components/common/comment/Comment';
import { CommentList as CommentListType } from '@/app/lib/types/comment/commentList';
import styles from './comment.module.scss';

export interface Props {
  commentList: CommentListType;
}

export default function CommentList({ commentList }: Props) {
  return (
    <div className={styles.commentList}>
      {commentList.commentInfoResponseList.map((comment) => (
        <Comment
          id={comment.commentId}
          key={comment.commentId}
          name={comment.userNickname}
          date={comment.createdAt}
          comment={comment.content}
        />
      ))}
    </div>
  );
}
