import { useState } from 'react';
import styles from './Draft.module.scss';

const DraftList = () => {
  const [draftList, setDraftList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <div className={styles.loader} />;
  }

  if (draftList.length === 0) {
    return <p>임시 저장된 글이 없습니다.</p>;
  }

  return <div className={styles.draftList}>임시 저장 목록</div>;
};
export default DraftList;
