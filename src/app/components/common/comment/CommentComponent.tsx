"use client"

import CommentProfile from '@/app/components/common/comment/CommentProfile';
import styles from './comment.module.scss';
import CommentInput from '@/app/components/common/comment/CommentInput';
import Comment from '@/app/components/common/comment/Comment'
import useInput from '@/app/lib/hooks/useInput';
import { KeyboardEvent } from 'react';

export default function CommentComponent() {
  const [content, onChange, reset] = useInput({ comment: '' });

  const onSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(content);
      reset();
    }
  }

  return (
    <div className={styles.block}>
      <div className={styles.head}>댓글 1</div>
      <div className={styles.inputBlock}>
        <CommentProfile />
        <CommentInput placeholder={'댓글 추가'} name={'comment'} value={content.comment} onChange={onChange} onKeyDown={onSubmit} />
      </div>
      <Comment id={1} name={'황용진'} date={'2024.08.24'} comment={'테스트 댓글이요'} />
    </div>
  )
}