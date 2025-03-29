import Link from 'next/link';
import type { BoardArticle } from '@/app/lib/types/board/board';
import styles from './NoticeItem.module.scss';

const NoticeItem = ({ notice }: { notice: BoardArticle }) => {
  const { boardId, title, userName, view, like, createdAt } = notice;

  return (
    <li className={styles.item}>
      <span className={styles.title}>
        <Link href={`notice/${boardId}`}>{title}</Link>
      </span>
      <span className={styles.author}>{userName}</span>
      <span className={styles.datetime}>{createdAt.slice(0, 10)}</span>
      <span className={styles.view}>{view}</span>
      <span className={styles.like}>{like}</span>
    </li>
  );
};

export default NoticeItem;
