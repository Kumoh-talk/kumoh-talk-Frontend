import { Suspense } from 'react';
import ProfileSideBar from '@/app/components/profile/ProfileSideBar';
import ProfileArticlesContent from '@/app/components/profile/articles/ProfileArticlesContent';
import styles from './page.module.scss';

export default function Page({
  searchParams,
}: {
  searchParams: { category?: string; page?: string; order?: string };
}) {
  return (
    <div className={styles.page}>
      <div className={styles.sideBar}>
        <div />
        <ProfileSideBar />
      </div>
      <div className={styles.content}>
        <Suspense fallback={<div>로딩중...</div>}>
          <ProfileArticlesContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
