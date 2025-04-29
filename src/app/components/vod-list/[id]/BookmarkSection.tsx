'use client';

import { useState } from 'react';
import Button from '../../common/button/Button';
import BookmarkCard from './BookmarkCard';
import styles from './bookmarkSection.module.scss';
import AddBookmarkField from './AddBookmarkField';
import { Bookmark } from '@/app/lib/types/streaming/vod';

interface Props {
  bookmarkList: Bookmark[];
}

export default function BookmarkSection({ bookmarkList }: Props) {
  const [isAddBookmark, setAddBookmark] = useState(false);

  return (
    <div className={styles.bookmarkWrapper}>
      <div className={styles.header}>
        <div className={styles.left}>
          <span className={styles.title}>내 북마크</span>
          <span
            className={styles.countBookmark}
          >{`(${bookmarkList.length}/5)`}</span>
        </div>
        <div className={styles.right}>
          <Button
            bgColor='bg-white'
            color='text-black-85'
            onClick={() => setAddBookmark((prev) => !prev)}
          >
            {!isAddBookmark ? '북마크 추가하기' : '취소'}
          </Button>
        </div>
      </div>
      {isAddBookmark && (
        <div className={styles.addBookmarkFieldWrapper}>
          <AddBookmarkField curTime='00:00:00' />
        </div>
      )}
      <div className={styles.bookmarkList}>
        {bookmarkList.map((bookmark) => (
          <BookmarkCard key={bookmark.bookmarkId} {...bookmark} />
        ))}
      </div>
    </div>
  );
}
