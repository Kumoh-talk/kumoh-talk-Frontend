'use client';

import styles from '@/app/components/common/comment/comment.module.scss';
import { useContext } from 'react';
import { CommentListContext } from '@/app/components/common/comment/CommentListProvider';

export default function ShowAccountComment() {
  const { success, data } = useContext(CommentListContext);

  if (!data.commentInfoResponseList) {
    return null;
  }

  return (
    <div className={styles.head}>댓글 {data.commentInfoResponseList.length}</div>
  )
}