import { RecruitmentType } from '@/app/lib/types/recruitmentBoards/recruitmentBoards';
import styles from './pagination.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { getRecruitmentArticlesByPage } from '@/app/lib/apis/recruitmentBoards';

export interface Props {
  searchParams: { category?: string; page?: string; order?: string };
}

export default async function Pagination({ searchParams }: Props) {
  const params = new URLSearchParams(searchParams as Record<string, string>);
  let maxPage = 0;
  try {
    const category = (searchParams.category?.toUpperCase() ??
      'MENTORING') as RecruitmentType;
    const page = parseInt(searchParams.page ?? '1');

    const res = await getRecruitmentArticlesByPage(category, page);
    maxPage = res?.totalPage ?? 0;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  const page = parseInt(searchParams.page ?? '1');
  const offset = Math.floor((page - 1) / 10) * 10;
  const pages = Array.from(
    { length: Math.max(Math.min(10, maxPage - offset), 1) },
    (_, i) => {
      const pageNum = offset + i + 1;
      params.set('page', String(pageNum));
      const url = params.toString();
      return (
        <Link
          href={`?${url}`}
          key={pageNum}
          className={clsx(styles.page, 'px-2', {
            [styles.nonActive]: page !== pageNum,
          })}
        >
          {pageNum}
        </Link>
      );
    },
  );

  return (
    <div className={styles.pagination}>
      {offset > 0 && (
        <>
          <button className={styles.side}>&lt;</button>
          <button className={styles.side}>&lt;</button>
        </>
      )}
      <div className={styles.pages}>{pages}</div>
      {offset + 11 <= maxPage && (
        <>
          <button className={styles.side}>&gt;</button>
          <button className={styles.side}>&gt;</button>
        </>
      )}
    </div>
  );
}
