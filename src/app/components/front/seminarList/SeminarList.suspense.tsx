import styles from './seminarList.module.scss';

export default function SeminarListSuspense() {
  return (
    <section className={styles.container}>
      <li className={styles.dummy}></li>
      <li className={styles.dummy}></li>
      <li className={styles.dummy}></li>
      <li className={styles.dummy}></li>
      <li className={styles.dummy}></li>
      <li className={styles.dummy}></li>
      <li className={styles.dummy}></li>
    </section>
  );
}
