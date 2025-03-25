import Header from './components/common/header/Header';
import ApplyBanner from './components/front/applyBanner/ApplyBanner';
import TabContentArticle from './components/front/tabContent/tabContentArticle/TabContentAritlce';
import styles from './page.module.scss';
import Footer from './components/common/footer/Footer';
import SeminarList from './components/front/seminarList/SeminarList';
import NoticeList from './components/front/noticeList/NoticeList';
import { Suspense } from 'react';
import SeminarListSuspense from './components/front/seminarList/SeminarList.suspense';
import NoticeListSuspense from './components/front/noticeList/NoticeList.suspense';

export default function Home() {
  return (
    <>
      <Header alwaysVisible={false} />
      <main className={styles.main}>
        <header>
          <div className={styles.logo}></div>
          <div className={styles.bannerWrapper}>
            <ApplyBanner />
          </div>
        </header>
        <div className={styles.seminarNotice}>
          <Suspense fallback={<SeminarListSuspense />}>
            <SeminarList />
          </Suspense>
          <Suspense fallback={<NoticeListSuspense />}>
            <NoticeList />
          </Suspense>
        </div>
        <TabContentArticle />
      </main>
      <Footer />
    </>
  );
}
