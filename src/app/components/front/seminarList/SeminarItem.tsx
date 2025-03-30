import BoardViewSvg from '@/app/assets/svg/BoardViewSvg';
import styles from './seminarItem.module.scss';
import Link from 'next/link';

type BoardType = 'SEMINAR' | 'NOTICE';

export interface BoardItemProps {
  boardId: number;
  title: string;
  userName: string;
  boardTag: BoardType;
  view: number;
  like: number;
  headImageUrl: string;
  createdAt: string;
}

export default function SeminarItem(props: BoardItemProps) {
  return (
    <li className={styles.container}>
      <Link href={`/seminar/${props.boardId}`}>
        <div className={styles.thumbWrapper}>
          {props.headImageUrl && (
            <img
              className={styles.thumbnail}
              src={props.headImageUrl}
              alt='썸네일'
            />
          )}
        </div>
        <div className={styles.new}>NEW</div>
        <div className={styles.info}>
          <span className={styles.title}>{props.title}</span>
          <span className={styles.sub}>
            <span className={styles.author}>{props.userName}</span>
            <BoardViewSvg />
            <span>{props.view}</span>
          </span>
        </div>
      </Link>
    </li>
  );
}
