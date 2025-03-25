import ArticleOrder from './ArticleOrder';
import CategoryList from './CategoryList';
import Pagination from './Pagination';
import styles from './articleList.module.scss';
import clsx from 'clsx';

export default function ArticleListSuspense({
  searchParams,
}: {
  searchParams: { category?: string; page?: string; order?: string };
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.aside}>
        <CategoryList searchParams={searchParams} />
        <ArticleOrder searchParams={searchParams} />
      </div>
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
      <div className={clsx(styles.bottom, styles.isGuest)}>
        <Pagination searchParams={searchParams} />
      </div>
    </div>
  );
}
