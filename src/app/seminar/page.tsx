import { Suspense } from 'react';
import Header from '@/app/components/common/header/Header';
import SeminarListSuspense from '@/app/components/seminar/SeminarList/SeminarListSuspense';
import SeminarList from '@/app/components/seminar/SeminarList/SeminarList';
import SeminarSort from '@/app/components/seminar/SeminarSort/SeminarSort';
import Pagination from '@/app/components/articles/Pagination';
import type { BoardSearchParams } from '@/app/lib/types/notice/board';
import styles from './page.module.scss';

export default function Seminar({ searchParams }: BoardSearchParams) {
  return (
    <>
      <Header title='세미나' />
      <main className={styles.main}>
        <header>세미나</header>
        <div className={styles.container}>
          <div className={styles.aside}>
            <SeminarSort searchParams={searchParams} />
          </div>
          <div className={styles.header}>
            <span className={styles.image} />
            <span className={styles.title}>제목</span>
            <span className={styles.author}>작성자</span>
            <span className={styles.datetime}>작성일</span>
            <span className={styles.view}>조회</span>
            <span className={styles.like}>좋아요</span>
          </div>
          <Suspense fallback={<SeminarListSuspense />}>
            <SeminarList searchParams={searchParams} />
          </Suspense>
          <div className={styles.bottom}>
            <Pagination searchParams={searchParams} />
          </div>
        </div>
      </main>
    </>
  );
}
