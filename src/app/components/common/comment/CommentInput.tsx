'use client';

import Button from '../button/Button';
import styles from './comment.module.scss';
import useCommentInput from '@/app/lib/hooks/useCommentInput';

export interface Props {
  boardId: string;
  userId: number;
}

export default function CommentInput({ boardId, userId }: Props) {
  const { comment, onChange, onSubmit, isPending } = useCommentInput(boardId);

  return (
    <div className={styles.editor}>
      <textarea
        className={styles.input}
        placeholder={
          userId ? '댓글 추가' : '로그인 후 댓글을 작성할 수 있습니다.'
        }
        name={'comment'}
        value={comment}
        onChange={onChange}
        maxLength={500}
        disabled={!userId}
      />
      <Button onClick={onSubmit} disabled={isPending || !userId}>
        {isPending ? '등록중...' : '등록'}
      </Button>
    </div>
  );
}
