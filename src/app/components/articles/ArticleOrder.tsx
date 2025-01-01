import styles from './articleOrder.module.scss';

export default function ArticleOrder() {
  return (
    <ul className={styles.order}>
      <li>최신순</li>
      <li>오래된 순</li>
    </ul>
  );
}
