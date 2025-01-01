'use client';

import styles from './comment.module.scss'
import { KeyboardEvent, useContext } from 'react';
import useInput from '@/app/lib/hooks/useInput';
import { CommentListContext } from '@/app/components/common/comment/CommentListProvider';

export default function CommentInput() {
  const [content, onChange, reset] = useInput({ comment: '' });
  const { boardId, commentTargetBoardType } = useContext(CommentListContext);

  const onSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!content.comment.trim()) {
      return;
    }

    if (e.key === 'Enter') {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
      console.log(content.comment);
      try {
        const response = fetch(`${API_URL}/api/v1/comments/${boardId}?commentTargetBoardType=${commentTargetBoardType}`, {
          method: 'POST',
          redirect: 'follow',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: content.comment,
            groupId: null,
          }),
        });
      } catch (error) {
        console.error(error);
      }

      reset();
      window.location.reload();
    }
  }

  return (
    <input className={styles.input} placeholder={'댓글 추가'} name={'comment'} value={content.comment} onChange={onChange}
           onKeyDown={onSubmit}/>
  )
}