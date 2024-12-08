import Link from 'next/link';
import clsx from 'clsx';
import styles from './articleItem.module.scss';

export type CategoryIdType = 'STUDY' | 'PROJECT' | 'MENTOR';

const nameMap: Record<CategoryIdType, string> = {
  STUDY: '스터디',
  PROJECT: '프로젝트',
  MENTOR: '멘토링',
};

export interface Props {
  categoryId: CategoryIdType;
  articleId: number;
  title: string;
  commentCount: number;
  createdAt: Date;
}

export default function ArticleItem({
  categoryId,
  articleId,
  title,
  commentCount,
  createdAt,
}: Props) {
  return (
    <li className={styles.item}>
      <Link href={`recruitment-boards/detail?id=${articleId}&boardType=${categoryId.toLowerCase()}`}>
        <span className={clsx(styles.category, styles[categoryId.toLocaleLowerCase()])}>
          [{nameMap[categoryId]}]
        </span>
        <span className={styles.titleWrapper}>
          <span className={styles.title}>{title}</span>{' '}
          <span className={styles.comment}>[{commentCount}]</span>
        </span>
        <span className={styles.datetime}>
          {createdAt.toLocaleDateString('en-CA')}
        </span>
      </Link>
    </li>
  );
}
