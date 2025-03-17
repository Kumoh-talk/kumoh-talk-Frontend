import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getMyDrafts, deleteBoard } from '@/app/lib/apis/post/boards';
import { getRelativeTime } from '@/app/lib/utils/post/dateFormatter';
import { getBoard } from '@/app/lib/apis/post/boards';
import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
import { useCurrentEditor } from '@tiptap/react';
import DraftItem from './DraftItem';
import type { DraftData } from '@/app/lib/types/post/boards';
import styles from './Draft.module.scss';

interface DraftListProps {
  close: () => void;
}

const DraftList = ({ close }: DraftListProps) => {
  const [draftList, setDraftList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setBoardId, setTitle, setTagList, setBoardHeadImageUrl } = usePostContent();
  const { editor } = useCurrentEditor();

  const applyDraft = ({ boardId, title, contents, categoryNames, boardHeadImageUrl }: DraftData) => {
    if (!editor) return;

    setBoardId(boardId);
    setTitle(title);
    setTagList(categoryNames);
    setBoardHeadImageUrl(boardHeadImageUrl);
    editor.commands.setContent(contents);
  };

  const loadDraft = async (boardId: number) => {
    try {
      const response = await getBoard(boardId);
      const { title, contents, categoryNames, boardHeadImageUrl } = response.data;

      applyDraft({ boardId, title, contents, categoryNames, boardHeadImageUrl });
      close();
      toast.success('글을 불러왔습니다.');
    } catch (error) {
      toast.error('글을 불러오는 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteDraft = async (boardId: number) => {
    const isConfirmed = window.confirm('임시 저장 글을 정말 삭제하시겠습니까?');

    if (isConfirmed) {
      try {
        const response = await deleteBoard(boardId);
  
        if ('success' in response) {
          toast.success('삭제 성공.');
          return;
        }
        
        toast.error('임시 저장 글 삭제 중 오류가 발생했습니다.');
      } catch (error) {
        toast.error('임시 저장 글 삭제 중 오류가 발생했습니다.');
      }
    }
  };

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
