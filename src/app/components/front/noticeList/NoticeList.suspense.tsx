import Link from 'next/link';
import styles from './noticeList.module.scss';
import PageMoreSvg from '@/app/assets/svg/PageMoreSvg';

export default function NoticeListSuspense() {
  return (
    <section className={styles.container}>
      <header>
        <span>공지사항</span>
        <Link href="/recruitment-boards?category=mentor">
          더 보기
          <PageMoreSvg />
        </Link>
      </header>
      <ul className={styles.list}>
        <div className={styles.line}></div>
        <li className={styles.dummy}></li>
        <div className={styles.line}></div>
        <li className={styles.dummy}></li>
        <div className={styles.line}></div>
        <li className={styles.dummy}></li>
        <div className={styles.line}></div>
        <li className={styles.dummy}></li>
        <div className={styles.line}></div>
        <li className={styles.dummy}></li>
        <div className={styles.line}></div>
        <li className={styles.dummy}></li>
        <div className={styles.line}></div>
        <li className={styles.dummy}></li>
      </ul>
    </section>
  );
}
