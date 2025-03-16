import Link from 'next/link';
import clsx from 'clsx';
import styles from './myArticleItem.module.scss';
import { BoardArticle } from '@/app/lib/types/board/board';

export interface Props extends BoardArticle {}

export default function MyBoardArticleItem({
  boardId,
  boardTag,
  title,
  createdAt,
}: Props) {
  return (
    <li className={styles.item}>
      <Link
        href={`/recruitment-boards/detail?id=${boardId}&boardType=${boardTag.toLowerCase()}`}
      >
        <div className={styles.categoryWrapper}>
          <span
            className={clsx(styles.category, styles[boardTag.toLocaleLowerCase()])}
          >
            {boardTag}
          </span>
          <span className={styles.datetime}>
            {new Date(createdAt).toLocaleDateString('en-CA')}
          </span>
        </div>
        <div className={styles.line}></div>
        <span className={styles.titleWrapper}>
          <span className={styles.title}>{title}</span>{' '}
        </span>
      </Link>
    </li>
  );
}
