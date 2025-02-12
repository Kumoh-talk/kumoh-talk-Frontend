'use client';

import ProfileImage from '@/app/components/common/ProfileImage';
import styles from './comment.module.scss';
import MoreButton from '@/app/components/common/comment/MoreButton';
import { useEffect, useRef, useState } from 'react';
import useCommentEdit from '@/app/lib/hooks/useCommentEdit';
import dayjs from 'dayjs';
import { CommentInfoResponseList } from '@/app/lib/types/comment/commentList';

export interface Props {
  currentComment: CommentInfoResponseList;
  parentComment?: CommentInfoResponseList | null;
}

export default function Comment({
  currentComment,
  parentComment = null,
}: Props) {
  const {
    commentId,
    userNickname: name,
    content: comment,
    createdAt: date,
    deletedAt,
    replyComments,
  } = currentComment;
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
        {parentComment && <div className={styles.leftPadding} />}
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
                  {deletedAt ? (
                    <span className={styles.deletedComment}>
                      삭제된 댓글입니다.
                    </span>
                  ) : (
                    <>
                      {parentComment?.groupId && (
                        <span className={styles.reply}>
                          @ &nbsp; {parentComment?.userNickname}
                        </span>
                      )}
                      {content}
                    </>
                  )}
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
          currentComment={replyComment}
          key={replyComment.commentId}
          parentComment={currentComment}
        />
      ))}
    </>
  );
}
