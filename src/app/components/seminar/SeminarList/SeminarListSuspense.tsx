import { Fragment } from 'react';
import styles from './SeminarList.module.scss';

const SeminarListSuspense = () => {
  return (
    <ul className={styles.list}>
      {Array.from({ length: 7 }, (_, idx) => (
        <Fragment key={idx}>
          <div className={styles.line}/>
          <div className={styles.dummy}>
            <div className={styles.image}/>
            <li className={styles.info}/>
          </div>
        </Fragment>
      ))}
    </ul>
  );
};

export default SeminarListSuspense;
