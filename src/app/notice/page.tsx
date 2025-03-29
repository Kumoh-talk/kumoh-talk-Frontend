import { Suspense } from 'react';
import Header from '@/app/components/common/header/Header';
import NoticeListSuspense from '@/app/components/notice/NoticeList/NoticeListSuspense';
import NoticeList from '@/app/components/notice/NoticeList/NoticeList';
import NoticeSort from '@/app/components/notice/NoticeSort/NoticeSort';
import Pagination from '@/app/components/articles/Pagination';
import type { BoardSearchParams } from '@/app/lib/types/notice/board';
import styles from './page.module.scss';

export default function Notice({ searchParams }: BoardSearchParams) {
  return (
    <>
      <Header title='공지사항' />
      <main className={styles.main}>
        <header>공지사항</header>
        <div className={styles.container}>
          <div className={styles.aside}>
            <NoticeSort searchParams={searchParams} />
          </div>
          <div className={styles.header}>
            <span className={styles.title}>제목</span>
            <span className={styles.author}>작성자</span>
            <span className={styles.datetime}>작성일</span>
            <span className={styles.view}>조회</span>
            <span className={styles.like}>좋아요</span>
          </div>
          <Suspense fallback={<NoticeListSuspense />}>
            <NoticeList searchParams={searchParams} />
          </Suspense>
          <div className={styles.bottom}>
            <Pagination searchParams={searchParams} />
          </div>
        </div>
      </main>
    </>
  );
}
