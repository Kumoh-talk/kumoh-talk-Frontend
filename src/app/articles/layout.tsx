import Footer from '../components/common/footer/Footer';
import Header from '../components/common/header/Header';

import styles from './layout.module.scss';

export type Props = {
  children: React.ReactNode;
};

export default function ArticlesLayout({ children }: Readonly<Props>) {
  return (
    <>
      <Header title="게시글" />
      <main className={styles.main}>
        <header>게시글</header>
        {children}
      </main>
      <Footer />
    </>
  );
}
