'use client'

import CommentProfile from '@/app/components/common/comment/CommentProfile';
import styles from './comment.module.scss'
import MoreButton from '@/app/components/common/comment/MoreButton';
import { useEffect, useRef, useState } from 'react';
import useCommentEdit from '@/app/lib/hooks/useCommentEdit';

export interface Props {
  id: number;
  name: string;
  date: string;
  comment: string;
}

export default function Comment({ id, name, date, comment }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [content, onChange, onSubmit] = useCommentEdit({ id, comment, setIsEdit });
  const editRef: any = useRef(null);
  
  useEffect(() => {
    if (isEdit) {
      editRef.current?.focus();
    }
  }, [isEdit])

  return (
    <div className={styles.commentBlock}>
      <CommentProfile/>
      <div className={styles.commentMain}>
        <div className={styles.commentTop}>
          <div className={styles.commentName}>{name}</div>
          <div className={styles.commentDate}>{date}</div>
        </div>
        <div className={styles.commentBottom}>
          {
            isEdit ?
              <input className={styles.commentEdit} ref={editRef} value={content} onChange={onChange} onKeyDown={onSubmit} /> :
              <div className={styles.commentText}>{content}</div>
          }
          {isEdit || <div className={styles.reactButton}>답글</div>}
        </div>
      </div>
      <div className={styles.moreButton}>
        <MoreButton setIsEdit={setIsEdit} />
      </div>
    </div>
  )
}