"use client"

// TODO: 백엔드 api 완성되면 수정
import CommentProfile from '@/app/components/common/comment/CommentProfile';
import styles from './comment.module.scss';
import CommentInput from '@/app/components/common/comment/CommentInput';
import Comment from '@/app/components/common/comment/Comment';
// TODO: 백엔드 api 완성되면 수정
export default function CommentComponent() {
  return (
    <div className={styles.block}>
      <div className={styles.head}>댓글 2</div>
      <div className={styles.inputBlock}>
        <CommentProfile/>
        <CommentInput placeholder={'댓글 추가'}/>
      </div>
      <Comment name={'황용진'} date={'2024.08.24'} comment={'테스트 댓글이요'} />
    </div>
  )
}