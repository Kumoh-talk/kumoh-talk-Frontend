import Link from 'next/link';
import clsx from 'clsx';
import type { BoardSearchParams } from '@/app/lib/types/notice/board';
import styles from './SeminarSort.module.scss';

const SORT_OPTIONS = [
  { value: 'DESC', label: '최신순' },
  { value: 'ASC', label: '오래된 순' },
] as const;

const SeminarSort = ({ searchParams }: BoardSearchParams) => {
  const currentSort = searchParams?.sort ?? 'DESC';

  return (
    <div className={styles.sort}>
      {SORT_OPTIONS.map(({ value, label }) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('sort', value);

        return (
          <Link
            className={clsx(styles.link, {
              [styles.selected]: currentSort === value,
            })}
            key={value}
            href={`?${newSearchParams.toString()}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
};

export default SeminarSort;
