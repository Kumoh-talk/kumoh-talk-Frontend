'use client';

import Button from '../button/Button';
import styles from './comment.module.scss';
import useCommentInput from '@/app/lib/hooks/useCommentInput';

export interface Props {
  boardId: string;
}

export default function CommentInput({ boardId }: Props) {
  const { comment, onChange, onSubmit, isPending } = useCommentInput(boardId);

  return (
    <div className={styles.editor}>
      <textarea
        className={styles.input}
        placeholder={'댓글 추가'}
        name={'comment'}
        value={comment}
        onChange={onChange}
        maxLength={500}
      />
      <Button onClick={onSubmit} disabled={isPending}>
        {isPending ? '등록중...' : '등록'}
      </Button>
    </div>
  );
}
