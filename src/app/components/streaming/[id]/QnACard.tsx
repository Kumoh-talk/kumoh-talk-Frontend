import { Check, ThumbsUp, X } from 'lucide-react';
import styles from './qnaCard.module.scss';

interface Props {
  name: string;
  content: string;
  time: string;
  likes: number;
  isAnswered: boolean;
}

export default function QnACard({
  name,
  content,
  time,
  likes,
  isAnswered,
}: Props) {
  return (
    <div className={styles.qnaCard}>
      <div className={styles.header}>
        <div className={styles.left}>
          <span className={styles.name}>{name}</span>
          <span className={styles.time}>{time}</span>
        </div>
        <div className={styles.right}>
          <div className={styles.likes}>
            <ThumbsUp />
            {likes}
          </div>
          <Check />
          <X />
        </div>
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
}
