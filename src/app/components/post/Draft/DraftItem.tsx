import TrashSvg from '@/app/assets/svg/Editor/TrashSvg';
import { MSG } from '@/app/lib/constants/post/board';
import styles from './Draft.module.scss';

interface DraftItemProps {
  boardId: number;
  updatedAt: string;
  title: string;
  loadDraft: (boardId: number) => void;
  onDelete : (boardId : number) => void;
}

const DraftItem = ({ boardId, updatedAt, title, loadDraft, onDelete }: DraftItemProps) => {
  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setTimeout(() => {
      const isConfirmed = window.confirm(MSG.CONFIRM_DELETE);

      if (isConfirmed) {
        onDelete(boardId);
      }
    }, 0);
  };

  return (
    <div className={styles.draftItem}>
      <span className={styles.createdAt}>{updatedAt}</span>
      <button className={styles.title} onClick={() => loadDraft(boardId)}>
        {title}
      </button>
      <button className={styles.deleteBtn} onClick={handleDeleteClick}>
        <TrashSvg/>
      </button>
    </div>
  );
};

export default DraftItem;