'use client';

import Button from '../button/Button';
import styles from './comment.module.scss';
import useCommentInput from '@/app/lib/hooks/useCommentInput';

export interface Props {
  boardId: string;
}

export default function CommentInput({ boardId }: Props) {
  const { comment, onChange, onSubmit } = useCommentInput(boardId);

  return (
    <div className={styles.editor}>
      <textarea
        className={styles.input}
        placeholder={'댓글 추가'}
        name={'comment'}
        value={comment}
        onChange={onChange}
      />
      <Button onClick={onSubmit}>등록</Button>
    </div>
  );
}
