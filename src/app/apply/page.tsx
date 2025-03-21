import Image from 'next/image';
import Header from '../components/common/header/Header';
import Footer from '../components/common/footer/Footer';
import seminarApply from '@/app/assets/png/seminarApply.png';
import SeminarApplyForm from '../components/apply/SeminarApplyForm/SeminarApplyForm';
import checkUserRole from '../lib/utils/common/checkUserRole';
import styles from './page.module.scss';

export default function SeminarApply() {
  checkUserRole({
    allowedRoles: ['ROLE_ACTIVE_USER', 'ROLE_SEMINAR_WRITER', 'ROLE_ADMIN'],
    redirectTo: '/',
  });

  return (
    <>
      <Header title='세미나 신청' />
      <main className={styles.layout}>
        <article className={styles.seminarApply}>
          <figure className={styles.imageWrapper}>
            <Image
              src={seminarApply}
              alt='세미나 신청 이미지'
              width={500}
              height={200}
              priority
            />
          </figure>
          <h1 className={styles.title}>야밤의 금오톡 세미나 신청하기</h1>
          <p className={styles.description}>세미나에 대한 내용</p>
          <SeminarApplyForm />
        </article>
      </main>
      <Footer />
    </>
  );
}
