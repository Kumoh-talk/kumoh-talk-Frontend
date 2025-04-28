import { Bookmark, Trash2 } from 'lucide-react';
import styles from './bookmarkCard.module.scss';

interface Props {
  bookmarkId: number;
  userId: number;
  vodId: number;
  title: string;
  time: string;
}

export default function BookmarkCard({
  bookmarkId,
  userId,
  vodId,
  title,
  time,
}: Props) {
  return (
    <div className={styles.bookmarkCard}>
      <div className={styles.left}>
        <Bookmark />
        {title}
      </div>
      <div className={styles.right}>
        {time}
        <Trash2 color='var(--color-red)' />
      </div>
    </div>
  );
}
