import styles from '@/app/components/common/comment/comment.module.scss';
import { CommentList } from '@/app/lib/types/comment/commentList';

export default function ShowAccountComment({
  commentList,
}: {
  commentList: CommentList;
}) {
  if (!commentList.commentInfoResponseList) {
    return null;
  }

  return <div className={styles.head}>댓글 {commentList.commentsCount}</div>;
}
