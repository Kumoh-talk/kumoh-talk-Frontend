'use client';

import { useEffect, useState } from 'react';

import styles from './pagination.module.scss';
import clsx from 'clsx';

export interface Props {}

export default function Pagination(props: Props) {
  const [maxPage, setMaxPage] = useState(1);
  useEffect(() => {
    const count = 45;
    setMaxPage(Math.ceil(count / 15));
  }, []);

  const page = 1;
  const offset = Math.floor((page - 1) / 10) * 10;
  const pages = Array.from(
    { length: Math.min(10, maxPage - offset) },
    (_, i) => (
      <button
        key={offset + i + 1}
        className={clsx(styles.page, 'px-2', {
          [styles.nonActive]: page !== offset + i + 1,
        })}
      >
        {offset + i + 1}
      </button>
    ),
  );

  return (
    <div className={styles.pagination}>
      {offset > 0 && (
        <>
          <button className={styles.side}>&gt;</button>
          <button className={styles.side}>&gt;</button>
        </>
      )}
      <div className={styles.pages}>{pages}</div>
      {offset + 11 <= maxPage && (
        <>
          <button className={styles.side}>&lt;</button>
          <button className={styles.side}>&lt;</button>
        </>
      )}
    </div>
  );
}
