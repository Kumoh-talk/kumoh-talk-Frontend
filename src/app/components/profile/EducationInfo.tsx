import styles from './educationInfo.module.scss';

export interface Props {
  studentStatus: string;
  grade: number;
  studentId: number;
  department: string;
  phoneNumber: string;
  email: string;
}

export default function EducationInfo({
  studentStatus,
  grade,
  studentId,
  department,
  phoneNumber,
  email,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.title}>
            <span>재적상태</span>
          </div>
          <div className={styles.content}>
            <span>{studentStatus}</span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <span>학번/학년</span>
          </div>
          <div className={styles.content}>
            <span>
              {studentId}/{grade}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.title}>
            <span>학과</span>
          </div>
          <div className={styles.content}>
            <span>{department}</span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <span>전화번호</span>
          </div>
          <div className={styles.content}>
            <span>{phoneNumber}</span>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.lastTitle}>
          <span>이메일</span>
        </div>
        <div className={styles.lastContent}>
          <span>{email}</span>
        </div>
      </div>
    </div>
  );
}
