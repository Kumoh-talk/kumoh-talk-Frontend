import { Dot, User2 } from 'lucide-react';
import styles from './streamingCard.module.scss';
import Link from 'next/link';

interface Props {
  streamingId: number;
  title: string;
  subTitle: string;
  presenter: string;
  viewers: number;
}

export default function StreamingCard({
  streamingId,
  title,
  subTitle,
  presenter,
  viewers,
}: Props) {
  return (
    <Link href={`./streaming/${streamingId}`} className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.thumbnail}>
          <div className={styles.viewers}>
            <Dot color='red' />
            {viewers.toLocaleString()}
          </div>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>
          <div className={styles.presenter}>
            <User2 /> &nbsp;{presenter}
          </div>
        </div>
      </div>
    </Link>
  );
}
