'use client';

import Comment from '@/app/components/common/comment/Comment';
import { CommentListApi } from '@/app/lib/types/comment/commentList';
import { useContext } from 'react';
import { CommentListContext } from '@/app/components/common/comment/CommentListProvider';
import styles from './comment.module.scss';

export default function CommentList() {
  const { success, data }: CommentListApi = useContext(CommentListContext)

  if (!data.commentInfoResponseList) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.commentList}>
      {data.commentInfoResponseList.map((comment) => (
        <Comment id={comment.commentId} key={comment.commentId} name={comment.userNickname} date={comment.createdAt}
                 comment={comment.content}/>
      ))}
    </div>
  )
}