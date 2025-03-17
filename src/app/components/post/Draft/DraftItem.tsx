import TrashSvg from '@/app/assets/svg/Editor/TrashSvg';
import styles from './Draft.module.scss';

interface DraftItemProps {
  boardId: number;
  updatedAt: string;
  title: string;
  loadDraft: (boardId: number) => void;
  onDelete : (boardId : number) => void;
}

const DraftItem = ({ boardId, updatedAt, title, loadDraft, onDelete }: DraftItemProps) => {
  return (
    <div className={styles.draftItem}>
      <span className={styles.createdAt}>{updatedAt}</span>
      <button className={styles.title} onClick={() => loadDraft(boardId)}>
        {title}
      </button>
      <button className={styles.deleteBtn} onClick={() => onDelete(boardId)}>
        <TrashSvg/>
      </button>
    </div>
  );
};

export default DraftItem;