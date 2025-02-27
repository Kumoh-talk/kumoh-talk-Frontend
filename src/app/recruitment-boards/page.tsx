import ArticleList from '../components/articles/ArticleList';
import Footer from '../components/common/footer/Footer';
import Header from '../components/common/header/Header';
import styles from './page.module.scss';

export default function Home({
  searchParams,
}: {
  searchParams: { category?: string; page?: string; order?: string };
}) {
  return (
    <>
      <Header title="게시글" />
      <main className={styles.main}>
        <header>게시글</header>
        <ArticleList searchParams={searchParams} />
      </main>
      <Footer />
    </>
  );
}
