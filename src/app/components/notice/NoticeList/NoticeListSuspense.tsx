import { Fragment } from 'react';
import styles from './NoticeList.module.scss';

const NoticeListSuspense = () => {
  return (
    <ul className={styles.list}>
      {Array.from({ length: 7 }, (_, idx) => (
        <Fragment key={idx}>
          <div className={styles.line}></div>
          <li className={styles.dummy}></li>
        </Fragment>
      ))}
    </ul>
  );
};

export default NoticeListSuspense;
