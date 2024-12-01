import Link from 'next/link';
import styles from './noticeCard.module.scss';

export interface Props {
  title: string;
  author: string;
  date: Date;
  articleId: string;
  thumbnail: string;
}

export default function NoticeCard({
  title,
  author,
  date,
  articleId,
  thumbnail,
}: Props) {
  const dateString = date.toISOString().split('T')[0];
  return (
    <li className={styles.noticeCard}>
      <Link href={`/notice/${articleId}`}>
        <div className={styles.thumbnail}>
          <img src="/images/thumbnail.png" alt="썸네일" />
        </div>
        <div className={styles.info}>
          <span className={styles.title}>{title}</span>
          <div className={styles.descWrapper}>
            <span className={styles.author}>{author}</span>
            <span className={styles.date}>{dateString}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
