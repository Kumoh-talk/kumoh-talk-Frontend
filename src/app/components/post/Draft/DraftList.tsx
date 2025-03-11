import { useEffect, useState } from 'react';
import { getMyDrafts } from '@/app/lib/apis/post/boards';
import { getRelativeTime } from '@/app/lib/utils/post/dateFormatter';
import styles from './Draft.module.scss';

interface DraftItemProps {
  updatedAt: string;
  title: string;
}

const DraftItem = ({ updatedAt, title }: DraftItemProps) => {
  return (
    <div className={styles.draftItem}>
      <span className={styles.createdAt}>{updatedAt}</span>
      <button className={styles.title} onClick={() => {}}>
        {title}
      </button>
    </div>
  );
};

const DraftList = () => {
  const [draftList, setDraftList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleDraftList = async () => {
      const response = await getMyDrafts();
      const { pageContents } = response.data;

      setDraftList(pageContents);
      setIsLoading(false);
    };

    handleDraftList();
  }, []);

  if (isLoading) {
    return <div className={styles.loader} />;
  }

  if (draftList.length === 0) {
    return <p>임시 저장된 글이 없습니다.</p>;
  }

  return (
    <div className={styles.draftList}>
      {draftList.map((draft) => {
        const { boardId, updatedAt, title } = draft;

        return (
          <DraftItem
            key={boardId}
            updatedAt={getRelativeTime(updatedAt)}
            title={title}
          />
        );
      })}
    </div>
  );
};

export default DraftList;
