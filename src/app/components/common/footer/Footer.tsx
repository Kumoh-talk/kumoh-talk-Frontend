import Image from 'next/image';
import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Image
          className={styles.logo}
          src='/images/logo_dark_1x.webp'
          alt='야밤의 금오톡 로고'
          width={20}
          height={20}
        />
        <div className={styles.terms}>
          <a
            href='https://kyxxn.notion.site/1b89adb3262680c0bc80e781df5e97b8?pvs=4'
            target='_blank'
          >
            이용약관
          </a>
          <a
            href='https://kyxxn.notion.site/3b840683792f4726bbc756678a669fcf?pvs=4'
            target='_blank'
          >
            개인정보처리방침
          </a>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <a href='https://www.kumoh.ac.kr' target='_blank'>
            금오공과대학교
          </a>
          <div className={styles.line}></div>
          <a href='https://lms.kumoh.ac.kr' target='_blank'>
            원스톱서비스
          </a>
          <div className={styles.line}></div>
          <a href='https://biskit.kumoh.ac.kr/' target='_blank'>
            BISKIT
          </a>
          <span>Contact us: kumoh.talk@google.com</span>
        </div>
        <div className={styles.right}>
          <span>Copyright ⓒ 2024-2025 야밤의금오톡 - All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
