'use client';

import ProfileImage from '@/app/components/common/ProfileImage';
import styles from './comment.module.scss';
import MoreButton from '@/app/components/common/comment/MoreButton';
import { useEffect, useRef, useState } from 'react';
import useCommentEdit from '@/app/lib/hooks/useCommentEdit';
import dayjs from 'dayjs';
import { CommentInfoResponseList } from '@/app/lib/types/comment/commentList';
import Reply from './Reply';
import Button from '../button/Button';

export interface Props {
  userName?: string;
  boardId: number;
  currentComment: CommentInfoResponseList;
  parentComment?: CommentInfoResponseList | null;
}

export default function Comment({
  userName,
  boardId,
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
  const [isReply, setIsReply] = useState(false);
  const [content, onChange, onSubmit, isPending] = useCommentEdit({
    id: commentId,
    currentComment: comment,
    setIsEdit,
  });
  const editRef: any = useRef(null);
  const replyRef: any = useRef(null);

  useEffect(() => {
    if (isEdit) {
      editRef.current?.focus();
    }
  }, [isEdit]);

  useEffect(() => {
    if (isReply) {
      replyRef.current?.focus();
    }
  }, [isReply]);

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
                <div className={styles.commentEditWrapper}>
                  <textarea
                    className={styles.commentEdit}
                    ref={editRef}
                    value={content}
                    onChange={onChange}
                    maxLength={500}
                  />
                  <div className={styles.editButtonWrapper}>
                    <Button
                      bgColor='bg-white'
                      color='text-black-85'
                      onClick={() => setIsEdit(false)}
                    >
                      취소
                    </Button>
                    <Button onClick={onSubmit} disabled={isPending}>
                      {isPending ? '수정중...' : '수정'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className={styles.textWrapper}>
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
                        <pre>{content}</pre>
                      </>
                    )}
                  </span>
                  <br />
                  <br />
                  <span
                    className={styles.reactButton}
                    onClick={() => setIsReply((prev) => !prev)}
                  >
                    답글
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={styles.moreButton}>
            {!deletedAt ? (
              <MoreButton
                userName={userName}
                commentId={commentId}
                commentUserName={name}
                setIsEdit={setIsEdit}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div>
        {isReply && (
          <Reply
            boardId={boardId}
            parentId={commentId}
            setIsReply={setIsReply}
            replyRef={replyRef}
          />
        )}
      </div>
      {replyComments.map((replyComment) => (
        <Comment
          userName={userName}
          boardId={boardId}
          currentComment={replyComment}
          key={replyComment.commentId}
          parentComment={currentComment}
        />
      ))}
    </>
  );
}
