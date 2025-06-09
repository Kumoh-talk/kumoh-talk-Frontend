import { Eye } from 'lucide-react';
import styles from './vodCard.module.scss';
import Link from 'next/link';
import { Vod } from '@/app/lib/types/streaming/vod';
import Image from 'next/image';

interface Props extends Vod {}

export default function VodCard({
  vodId,
  title,
  thumbnailUrl,
  length,
  views,
}: Props) {
  return (
    <Link href={`./vod-list/${vodId}`} className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.thumbnail}>
          <img src={thumbnailUrl} alt='' style={{ objectFit: 'cover' }} />
          <div className={styles.vodLength}>
            <span>{length}</span>
          </div>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.content}>
            <div className={styles.views}>
              <Eye /> {views.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
