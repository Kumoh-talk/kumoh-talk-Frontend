import { Dot } from 'lucide-react';
import styles from './streamingCard.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { Streaming } from '@/app/lib/types/streaming/streaming';

interface Props extends Streaming {}

export default function StreamingCard({
  streamId,
  title,
  thumbnailUrl,
  viewers,
}: Props) {
  return (
    <Link href={`./streaming/${streamId}`} className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.thumbnail}>
          {thumbnailUrl ? <img src={thumbnailUrl} alt='' /> : null}
          <div className={styles.viewers}>
            <Dot color='red' />
            {viewers.toLocaleString()}
          </div>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </div>
    </Link>
  );
}
