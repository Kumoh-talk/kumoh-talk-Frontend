import { getRelativeTime } from '@/app/lib/utils/post/dateFormatter';
import { useDrafts } from '@/app/lib/hooks/post/useDrafts';
import DraftItem from './DraftItem';
import styles from './Draft.module.scss';

interface DraftListProps {
  close: () => void;
}

const DraftList = ({ close }: DraftListProps) => {
  const { draftList, isLoading, loadDraft, handleDeleteDraft } = useDrafts(close);

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
            boardId={boardId}
            updatedAt={getRelativeTime(updatedAt)}
            title={title}
            loadDraft={loadDraft}
            onDelete={handleDeleteDraft}
          />
        );
      })}
    </div>
  );
};

export default DraftList;
