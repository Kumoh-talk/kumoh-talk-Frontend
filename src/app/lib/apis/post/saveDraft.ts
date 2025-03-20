import { updateDraft, postDraft } from '@/app/lib/apis/post/boards';
import type { PostBoards, PatchBoards } from '@/app/lib/types/post/boards';
import type { Editor } from '@tiptap/react';

interface SaveDraftCallbacks {
  onSuccess?: () => void;
  onError?: () => void;
}

interface CreateDraftOption extends PostBoards {
  editor: Editor;
}

interface EditDraftOption extends PatchBoards {
  editor: Editor;
}

export const createDraft = async (
  { title, categoryName, boardHeadImageUrl, editor }: CreateDraftOption,
  { onSuccess, onError }: SaveDraftCallbacks = {}
) => {
  const postData: PostBoards = {
    title,
    contents: editor.getHTML(),
    categoryName,
    boardType: 'SEMINAR',
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
  { id, title, categoryName, boardHeadImageUrl, editor }: EditDraftOption,
  { onSuccess, onError }: SaveDraftCallbacks = {}
) => {
  const patchData: PatchBoards = {
    id,
    title,
    contents: editor.getHTML(),
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
