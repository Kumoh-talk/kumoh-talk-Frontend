import { toast } from 'react-toastify';
import { deleteBoard, getBoard } from '@/app/lib/apis/post/boards';
import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
import { useCurrentEditor } from '@tiptap/react';
import useInfiniteFetcher from './useInfiniteFetcher';
import type { DraftPreview, DraftContent } from '@/app/lib/types/post/boards';

export const useDrafts = (close: () => void) => {
  const { data: draftList, state, hasNextPage, setFetchState, fetchNextPage } = useInfiniteFetcher();
  const { boardId : curBoardId, setBoardId, setTitle, setTagList, setBoardHeadImageUrl } = usePostContent();
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
    if(curBoardId === boardId){
      toast.info('현재 작성 중인 글입니다.');
      return;
    }

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
    setFetchState((prev) => ({
      ...prev,
      data: prevDraftList,
    }));
  };

  const handleDeleteDraft = async (boardId: number) => {
    const prevDraftList = draftList;
    const updatedDraftList = removeDraftById(draftList, boardId);

    setFetchState((prev) => ({
      ...prev,
      data: updatedDraftList,
    }));

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

  return { draftList, state, hasNextPage, fetchNextPage, loadDraft, handleDeleteDraft };
};
