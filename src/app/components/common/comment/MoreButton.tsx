'use client';

import MoreSvg from '@/app/assets/svg/MoreSvg';
import styles from './comment.module.scss';
import { Dispatch, SetStateAction } from 'react';
import ModifyBubble from '@/app/components/common/modifyBubble/ModifyBubble';
import useCommentMoreBubble from '@/app/lib/hooks/useCommentMoreBubble';

interface Props {
  commentId: number;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export default function MoreButton({ commentId, setIsEdit }: Props) {
  const { bubbleRef, isOpen, onModify, onDelete, onInsideClick } =
    useCommentMoreBubble(commentId, setIsEdit);

  return (
    <div ref={bubbleRef}>
      <div className={styles.btn} onClick={onInsideClick}>
        <MoreSvg />
      </div>
      <div>
        {isOpen && <ModifyBubble onModify={onModify} onDelete={onDelete} />}
      </div>
    </div>
  );
}
