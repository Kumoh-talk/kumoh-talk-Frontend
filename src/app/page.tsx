import Header from './components/common/header/Header';
import ApplyBanner from './components/front/applyBanner/ApplyBanner';
import TabContentArticle from './components/front/tabContent/tabContentArticle/TabContentAritlce';
import styles from './page.module.scss';
import Footer from './components/common/footer/Footer';
import SeminarList from './components/front/seminarList/SeminarList';
import NoticeList from './components/front/noticeList/NoticeList';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <header>
          <div className={styles.logo}></div>
          <div className={styles.bannerWrapper}>
            <ApplyBanner />
          </div>
        </header>
        <div className={styles.seminarNotice}>
          <SeminarList />
          <NoticeList />
        </div>
        <TabContentArticle />
      </main>
      <Footer />
    </>
  );
}
