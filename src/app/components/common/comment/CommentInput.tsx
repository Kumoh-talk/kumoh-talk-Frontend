'use client';

import styles from './comment.module.scss';
import { KeyboardEvent } from 'react';
import useInput from '@/app/lib/hooks/useInput';
import { postRecruitmentBoardComment } from '@/app/lib/apis/recruitment-boards/recruitmentBoard';
import useCommentInput from '@/app/lib/hooks/useCommentInput';

export interface Props {
  boardId: string;
}

export default function CommentInput({ boardId }: Props) {
  const { content, onChange, onSubmit } = useCommentInput(boardId);

  return (
    <input
      className={styles.input}
      placeholder={'댓글 추가'}
      name={'comment'}
      value={content.comment}
      onChange={onChange}
      onKeyDown={onSubmit}
    />
  );
}
