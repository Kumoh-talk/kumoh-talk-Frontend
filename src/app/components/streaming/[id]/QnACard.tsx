import { Check, ThumbsUp, X } from 'lucide-react';
import styles from './qnaCard.module.scss';
import clsx from 'clsx';
import { Qna } from '@/app/lib/types/streaming/streaming';

interface Props extends Qna {}

export default function QnACard({
  qnaId,
  name,
  content,
  time,
  likes,
  anonymous,
}: Props) {
  const handleThumbsUp = (qnaId: number) => {
    console.log(`${qnaId}번 질문 따봉`);
  };

  const handleCheck = (qnaId: number) => {
    console.log(`${qnaId}번 질문 체크`);
  };

  const handleClose = (qnaId: number) => {
    console.log(`${qnaId}번 질문 삭제`);
  };

  return (
    <div className={styles.qnaCard}>
      <div className={styles.header}>
        <div className={styles.left}>
          <span className={styles.name}>{name}</span>
          <span className={styles.time}>{time}</span>
        </div>
        <div className={styles.right}>
          <div className={styles.likes}>
            <button
              className={clsx(styles.iconButton, styles.thumbsUp)}
              onClick={() => handleThumbsUp(qnaId)}
            >
              <ThumbsUp />
            </button>
            {likes}
          </div>
          <button
            className={clsx(styles.iconButton, styles.check)}
            onClick={() => handleCheck(qnaId)}
          >
            <Check />
          </button>
          <button
            className={clsx(styles.iconButton, styles.close)}
            onClick={() => handleClose(qnaId)}
          >
            <X />
          </button>
        </div>
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
}
