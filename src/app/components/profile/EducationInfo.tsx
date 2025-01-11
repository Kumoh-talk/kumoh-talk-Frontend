import styles from './educationInfo.module.scss';

export default function EducationInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.title}>
            <span>재적상태</span>
          </div>
          <div className={styles.content}>
            <span>재학</span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <span>학번/학년</span>
          </div>
          <div className={styles.content}>
            <span>20201234/1학년</span>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.title}>
            <span>학과</span>
          </div>
          <div className={styles.content}>
            <span>컴퓨터공학과</span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <span>전화번호</span>
          </div>
          <div className={styles.content}>
            <span>010-1234-5678</span>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.lastTitle}>
          <span>이메일</span>
        </div>
        <div className={styles.lastContent}>
          <span>asd123@kumoh.ac.kr</span>
        </div>
      </div>
    </div>
  );
}
