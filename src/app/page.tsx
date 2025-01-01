import Header from './components/common/header/Header';
import ApplyBanner from './components/front/applyBanner/ApplyBanner';
import TabList from './components/front/tabList/TabList';
import TabContent from './components/front/tabContent/TabContent';
import styles from './page.module.scss';
import Footer from './components/common/footer/Footer';

export default function Home({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <header>
          <div className={styles.logo}></div>
          <div className={styles.bannerWrapper}>
            <ApplyBanner />
            <TabList />
          </div>
        </header>
        <TabContent tab={searchParams.tab} />
      </main>
      <Footer />
    </>
  );
}
