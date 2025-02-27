import styles from './listTitle.module.scss';

export default function ListTitle() {
  return (
    <div className={styles.titleBlock}>
      <p className={styles.name}>이름 / 학과</p>
      <p className={styles.grade}>학년</p>
      <p className={styles.studentId}>학번</p>
      <p className={styles.status}>재학상태</p>
    </div>
  );
}
