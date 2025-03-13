'use client';

import MoreSvg from '@/app/assets/svg/MoreSvg';
import styles from './comment.module.scss';
import { Dispatch, SetStateAction } from 'react';
import ModifyBubble from '@/app/components/common/modifyBubble/ModifyBubble';
import useCommentMoreBubble from '@/app/lib/hooks/useCommentMoreBubble';
import DeClareBubble from '../declareBubble/DeclareBubble';

interface Props {
  userId: number;
  userName?: string;
  commentId: number;
  commentUserName: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export default function MoreButton({
  userId,
  userName,
  commentId,
  commentUserName,
  setIsEdit,
}: Props) {
  const { bubbleRef, isOpen, onModify, onDelete, onReport, onInsideClick } =
    useCommentMoreBubble(commentId, userId, setIsEdit);

  const GetBubble = (userName?: string) => {
    if (userName === commentUserName) {
      return <ModifyBubble onModify={onModify} onDelete={onDelete} />;
    } else {
      return <DeClareBubble onReport={onReport} />;
    }
  };

  return (
    <div ref={bubbleRef}>
      <div className={styles.btn} onClick={onInsideClick}>
        <MoreSvg />
      </div>
      <div>{isOpen && GetBubble(userName)}</div>
    </div>
  );
}
