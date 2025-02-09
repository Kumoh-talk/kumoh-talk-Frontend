import PenSvg from '@/app/assets/svg/PenSvg';
import styles from './newsletterInfo.module.scss';

export default function NewsletterInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>구독 이메일</span>
      </div>
      <div className={styles.content}>
        <span>이메일정보가 들어갈 공간</span>
        <button>
          <PenSvg />
        </button>
      </div>
    </div>
  );
}
