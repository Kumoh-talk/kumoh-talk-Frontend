'use client';

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
  const handleDeleteBookmark = () => {
    console.log(`북마크 ${bookmarkId}번 삭제`);
  };

  return (
    <div className={styles.bookmarkCard}>
      <div className={styles.left}>
        <Bookmark />
        {title}
      </div>
      <div className={styles.right}>
        {time}
        <button onClick={handleDeleteBookmark}>
          <Trash2 color='var(--color-red)' />
        </button>
      </div>
    </div>
  );
}
