import Button from '../../common/button/Button';
import BookmarkCard from './BookmarkCard';
import styles from './bookmarkSection.module.scss';

interface Props {
  bookmarkList: {
    bookmarkId: number;
    userId: number;
    vodId: number;
    title: string;
    time: string;
  }[];
}

export default function BookmarkSection({ bookmarkList }: Props) {
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
          <Button bgColor='bg-white' color='text-black-85'>
            북마크 추가하기
          </Button>
        </div>
      </div>
      <div className={styles.bookmarkList}>
        {bookmarkList.map((bookmark) => (
          <BookmarkCard key={bookmark.bookmarkId} {...bookmark} />
        ))}
      </div>
    </div>
  );
}
