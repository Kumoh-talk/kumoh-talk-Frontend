'use client';

import ProfileImage from '@/app/components/common/ProfileImage';
import styles from './comment.module.scss';
import MoreButton from '@/app/components/common/comment/MoreButton';
import { useEffect, useRef, useState } from 'react';
import useCommentEdit from '@/app/lib/hooks/useCommentEdit';
import dayjs from 'dayjs';
import { CommentInfoResponseList } from '@/app/lib/types/comment/commentList';

export interface Props {
  commentId: number;
  parentCommentName?: string | null;
  name: string;
  date: string;
  comment: string;
  replyComments: CommentInfoResponseList[];
}

export default function Comment({
  commentId,
  parentCommentName = null,
  name,
  date,
  comment,
  replyComments,
}: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [content, onChange, onSubmit] = useCommentEdit({
    id: commentId,
    currentComment: comment,
    setIsEdit,
  });
  const editRef: any = useRef(null);

  useEffect(() => {
    if (isEdit) {
      editRef.current?.focus();
    }
  }, [isEdit]);

  return (
    <>
      <div className={styles.commentWrapper}>
        {parentCommentName && <div className={styles.leftPadding} />}
        <div className={styles.commentBlock}>
          <ProfileImage />
          <div className={styles.commentMain}>
            <div className={styles.commentTop}>
              <div className={styles.commentName}>{name}</div>
              <div className={styles.commentDate}>
                {dayjs(date).format('YYYY.MM.DD')}
              </div>
            </div>
            <div className={styles.commentBottom}>
              {isEdit ? (
                <textarea
                  className={styles.commentEdit}
                  ref={editRef}
                  value={content}
                  onChange={onChange}
                  onKeyDown={onSubmit}
                />
              ) : (
                <span className={styles.commentText}>
                  {parentCommentName || (
                    <span className={styles.reply}>
                      @ &nbsp; {parentCommentName}
                    </span>
                  )}
                  {content}
                </span>
              )}
              {isEdit || <div className={styles.reactButton}>답글</div>}
            </div>
          </div>
          <div className={styles.moreButton}>
            <MoreButton commentId={commentId} setIsEdit={setIsEdit} />
          </div>
        </div>
      </div>
      {replyComments.map((replyComment) => (
        <Comment
          commentId={replyComment.commentId}
          key={replyComment.commentId}
          parentCommentName={name}
          name={replyComment.userNickname}
          date={replyComment.createdAt}
          comment={replyComment.content}
          replyComments={replyComment.replyComments}
        />
      ))}
    </>
  );
}
