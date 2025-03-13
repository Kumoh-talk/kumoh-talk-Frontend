'use client';

import Button from '../button/Button';
import styles from './reply.module.scss';
import useReply from '@/app/lib/hooks/useReply';

export interface Props {
  userId: number;
  boardId: number;
  parentId: number;
  setIsReply: React.Dispatch<React.SetStateAction<boolean>>;
  replyRef: React.RefObject<HTMLTextAreaElement>;
}

export default function Reply({
  userId,
  boardId,
  parentId,
  setIsReply,
  replyRef,
}: Props) {
  const { content, onChange, onCancel, onReply, isPending } = useReply(
    boardId,
    parentId,
    setIsReply
  );

  return (
    <div className={styles.replyWrapper}>
      <textarea
        placeholder={
          userId
            ? '답글을 입력하세요...'
            : '로그인 후 답글을 작성할 수 있습니다.'
        }
        onChange={onChange}
        value={content}
        ref={replyRef}
        maxLength={500}
        disabled={!userId}
      />
      <div className={styles.buttonWrapper}>
        <Button bgColor='bg-white' color='text-black-85' onClick={onCancel}>
          취소
        </Button>
        <Button onClick={onReply} disabled={isPending || !userId}>
          {isPending ? '등록중...' : '등록'}
        </Button>
      </div>
    </div>
  );
}
