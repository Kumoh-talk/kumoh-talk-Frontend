import { Eye, User2 } from 'lucide-react';
import styles from './vodCard.module.scss';
import Link from 'next/link';

interface Props {
  vodId: number;
  title: string;
  cam_url: string;
  slide_url: string;
  length: string;
  episode: number;
  summary: string;
  presenter: string;
  views: number;
}

export default function VodCard({
  vodId,
  title,
  cam_url,
  slide_url,
  length,
  episode,
  summary,
  presenter,
  views,
}: Props) {
  return (
    <Link href={`./vod-list/${vodId}`} className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.thumbnail}>
          <div className={styles.vodLength}>
            <span>{length}</span>
          </div>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>야밤의금오톡 세미나 {episode}회</h3>
          <div className={styles.content}>
            <div className={styles.presenter}>
              <User2 /> &nbsp;{presenter}
            </div>
            <div className={styles.views}>
              <Eye /> {views.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
