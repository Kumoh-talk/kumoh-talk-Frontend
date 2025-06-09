'use client';

import { ThumbsUp, X } from 'lucide-react';
import styles from './qnaCard.module.scss';
import clsx from 'clsx';
import { Qna } from '@/app/lib/types/streaming/streaming';
import useSocketStore from '@/app/lib/stores/socketStore';
import { END_POINTS } from '@/app/lib/constants/common/path';
import { UserRoleValidator } from '@/app/lib/apis/userRoleValidator';

interface Props extends Qna {
  accessToken?: string;
  userRole: string;
}

export default function QnACard({
  qnaId,
  nickname,
  content,
  time,
  likes,
  anonymous,
  accessToken,
  userRole,
}: Props) {
  const { stompClient, streamId, myLikedQna } = useSocketStore();
  const userRoleValidator = new UserRoleValidator();

  const isDisabled = myLikedQna.includes(qnaId);

  const handleThumbsUp = (qnaId: number) => {
    if (stompClient) {
      if (!userRoleValidator.guest(userRole)) {
        alert('로그인 후 이용가능합니다.');
        return;
      }
      stompClient.send(
        END_POINTS.PUBLISH.LIKED_QNA(JSON.stringify(streamId), qnaId),
        {
          Authorization: `Bearer ${accessToken}`,
        }
      );
    }
  };

  const handleClose = (qnaId: number) => {
    if (stompClient) {
      if (!userRoleValidator.admin(userRole)) {
        alert('어드민 권한이 있어야 이용가능합니다.');
        return;
      }
      stompClient.send(
        END_POINTS.PUBLISH.DELETE_QNA(JSON.stringify(streamId), qnaId),
        {
          Authorization: `Bearer ${accessToken}`,
        }
      );
    }
  };

  return (
    <div className={styles.qnaCard}>
      <div className={styles.header}>
        <div className={styles.left}>
          <span className={styles.name}>{anonymous ? '익명' : nickname}</span>
          <span className={styles.time}>{time}</span>
        </div>
        <div className={styles.right}>
          <div className={styles.likes}>
            <button
              className={clsx(styles.iconButton, styles.thumbsUp)}
              onClick={() => handleThumbsUp(qnaId)}
              disabled={isDisabled}
            >
              <ThumbsUp />
            </button>
            {likes}
          </div>
          {userRoleValidator.admin(userRole) ? (
            <button
              className={clsx(styles.iconButton, styles.close)}
              onClick={() => handleClose(qnaId)}
            >
              <X />
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <pre className={styles.content}>{content}</pre>
    </div>
  );
}
