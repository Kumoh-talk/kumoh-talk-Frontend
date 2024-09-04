import CommentProfile from '@/app/components/common/comment/CommentProfile';
import styles from './comment.module.scss'
import MoreButton from "@/app/components/common/comment/MoreButton";

export interface Props {
  name: string;
  date: string;
  comment: string;
}
// TODO: 백엔드 api 완성되면 수정
export default function Comment({name, date, comment}: Props) {
  return (
    <div className={styles.commentBlock}>
      <CommentProfile/>
      <div className={styles.commentMain}>
        <div className={styles.commentTop}>
          <div className={styles.commentName}>{name}</div>
          <div className={styles.commentDate}>{date}</div>
        </div>
        <div className={styles.commentBottom}>
          <div className={styles.commentText}>{comment}</div>
          <div className={styles.reactButton}>답글</div>
        </div>
      </div>
      <div className={styles.moreButton}>
        <MoreButton />
      </div>
    </div>
  )
}