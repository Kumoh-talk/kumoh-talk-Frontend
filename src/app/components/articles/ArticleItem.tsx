import Link from 'next/link';
import clsx from 'clsx';
import styles from './articleItem.module.scss';
import { typeToText } from '@/app/lib/constants/tag/tagValues';
import { RecruitmentArticle } from '@/app/lib/types/recruitmentBoards/recruitmentBoards';

export interface Props extends RecruitmentArticle {}

export default function ArticleItem({
  type,
  boardId,
  title,
  commentCount,
  recruitmentStart,
}: Props) {
  return (
    <li className={styles.item}>
      <Link
        href={`recruitment-boards/detail?id=${boardId}&boardType=${type.toLowerCase()}`}
      >
        <span
          className={clsx(styles.category, styles[type.toLocaleLowerCase()])}
        >
          [{typeToText[type]}]
        </span>
        <span className={styles.titleWrapper}>
          <span className={styles.title}>{title}</span>{' '}
          <span className={styles.comment}>[{commentCount}]</span>
        </span>
        <span className={styles.datetime}>
          {new Date(recruitmentStart).toLocaleDateString('en-CA')}
        </span>
      </Link>
    </li>
  );
}
