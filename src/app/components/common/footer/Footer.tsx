import Link from 'next/link';
import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <img
          className={styles.logo}
          src="/images/logo_dark_1x.webp"
          alt="야밤의 금오톡 로고"
        />
        <div className={styles.terms}>
          <Link href="/terms">이용약관</Link>
          <Link href="/privacy">개인정보처리방침</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <a href="https://www.kumoh.ac.kr" target="_blank">
            금오공과대학교
          </a>
          <div className={styles.line}></div>
          <a href="https://lms.kumoh.ac.kr" target="_blank">
            원스톱서비스
          </a>
          <div className={styles.line}></div>
          <a href="https://biskit.kumoh.ac.kr/" target="_blank">
            BISKIT
          </a>
          <span>Contact us: kumoh.talk@google.com</span>
        </div>
        <div className={styles.right}>
          <span>Copyright ⓒ 2024 야밤의금오톡 - All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
