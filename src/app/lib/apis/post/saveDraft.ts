import { updateDraft, postDraft } from '@/app/lib/apis/post/boards';
import type { PostBoards, PatchBoards } from '@/app/lib/types/post/boards';

interface SaveDraftCallbacks {
  onSuccess?: () => void;
  onError?: () => void;
}

export const createDraft = async (
  { title, contents, categoryName, boardHeadImageUrl, boardType }: PostBoards,
  { onSuccess, onError }: SaveDraftCallbacks = {}
) => {
  const postData: PostBoards = {
    title,
    contents,
    categoryName,
    boardType,
  };

  if (boardHeadImageUrl) {
    postData.boardHeadImageUrl = boardHeadImageUrl;
  }

  try {
    const response = await postDraft(postData);

    if (response.success === 'true') {
      onSuccess?.();

      const { boardId } = response.data;

      return boardId;
    } else {
      onError?.();
    }
  } catch (error) {
    console.error(error);
    onError?.();
  }
};

export const editDraft = async (
  { id, title, contents, categoryName, boardHeadImageUrl }: PatchBoards,
  { onSuccess, onError }: SaveDraftCallbacks = {}
) => {
  const patchData: PatchBoards = {
    id,
    title,
    contents,
    categoryName,
  };

  if (boardHeadImageUrl) {
    patchData.boardHeadImageUrl = boardHeadImageUrl;
  }

  try {
    const response = await updateDraft(patchData);

    if (response.success === 'true') {
      onSuccess?.();
    } else {
      onError?.();
    }
  } catch (error) {
    console.error(error);
    onError?.();
  }
};
