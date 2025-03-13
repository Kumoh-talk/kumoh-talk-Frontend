import styles from './page.module.scss';
import Header from '../components/common/header/Header';
import Footer from '../components/common/footer/Footer';
import InputForm from '../components/info-form/InputForm';

export default function Page({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) {
  return (
    <>
      <Header title={`인적사항`} />
      <main className={styles.container}>
        <InputForm redirect={searchParams.redirect} />
      </main>
      <Footer />
    </>
  );
}
