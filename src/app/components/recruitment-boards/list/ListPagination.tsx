import styles from './listPagination.module.scss';
import clsx from 'clsx';
import Link from 'next/link';

export interface Props {
  totalPage: number;
  searchParams: {
    id?: string;
    title?: string;
    boardType?: string;
    tag?: string;
    name?: string;
    page?: string;
    sort?: string;
  };
}

export default async function ListPagination({
  totalPage,
  searchParams,
}: Props) {
  const params = new URLSearchParams(searchParams as Record<string, string>);
  let maxPage = totalPage;

  const page = parseInt(searchParams.page ?? '1');
  const offset = Math.floor((page - 1) / 10) * 10;
  const pages = Array.from(
    { length: Math.min(10, maxPage - offset) },
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
    }
  );
  console.log(pages);

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
