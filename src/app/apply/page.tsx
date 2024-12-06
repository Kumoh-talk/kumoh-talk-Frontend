import Image from 'next/image';
import seminarApply from '@/app/assets/png/seminarApply.png';
import SeminarApplyForm from '../components/apply/SeminarApplyForm/SeminarApplyForm';
import styles from './page.module.scss';

export default function SeminarApply() {
  return (
    <main className={styles.layout}>
      <article className={styles.seminarApply}>
        <figure className={styles.imageWrapper}>
          <Image
            src={seminarApply}
            alt='세미나 신청 이미지'
            width={500}
            height={200}
          />
        </figure>
        <h1 className={styles.title}>야밤의 금오톡 세미나 신청하기</h1>
        <p className={styles.description}>세미나에 대한 내용</p>
        <SeminarApplyForm />
      </article>
    </main>
  );
}
