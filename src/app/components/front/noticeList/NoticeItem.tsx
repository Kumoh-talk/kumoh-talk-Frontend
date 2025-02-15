import Link from 'next/link';
import { BoardItemProps } from '../seminarList/SeminarItem';
import styles from './noticeItem.module.scss';

export default function NoticeItem(props: BoardItemProps) {
  return (
    <li className={styles.container}>
      <Link href={`/apply/${props.boardId}`}>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>{props.title}</span>
          <div className={styles.new}>N</div>
        </div>
        <span className={styles.date}>{props.createdAt.slice(0, 10)}</span>
      </Link>
    </li>
  );
}
