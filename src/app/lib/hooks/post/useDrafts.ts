import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getMyDrafts, deleteBoard, getBoard } from '@/app/lib/apis/post/boards';
import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
import { useCurrentEditor } from '@tiptap/react';
import type { DraftPreview, DraftContent } from '@/app/lib/types/post/boards';

export const useDrafts = (close: () => void) => {
  const [draftList, setDraftList] = useState<DraftPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setBoardId, setTitle, setTagList, setBoardHeadImageUrl } = usePostContent();
  const { editor } = useCurrentEditor();

  const applyDraft = ({ boardId, title, contents, categoryNames, boardHeadImageUrl }: DraftContent) => {
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

  const removeDraftById = (drafts: DraftPreview[], boardId: number) => {
    return drafts.filter((draft) => draft.boardId !== boardId);
  };

  const restoreDraftList = (prevDraftList : DraftPreview[]) => {
    setDraftList(prevDraftList);
  };

  const handleDeleteDraft = async (boardId: number) => {
    const prevDraftList = draftList;

    setDraftList((prev) => removeDraftById(prev, boardId));

    try {
      const response = await deleteBoard(boardId);

      if (response.success === 'false') {
        restoreDraftList(prevDraftList);
        toast.error('임시 저장 글 삭제 중 오류가 발생했습니다.');
      }
    } catch (error) {
      restoreDraftList(prevDraftList);
      toast.error('임시 저장 글 삭제 중 오류가 발생했습니다.');
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

  return { draftList, isLoading, loadDraft, handleDeleteDraft };
};
