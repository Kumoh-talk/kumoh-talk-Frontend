import { toast } from 'react-toastify';
import { useCurrentEditor } from '@tiptap/react';
import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
import { createDraft, editDraft } from '@/app/lib/apis/post/saveDraft';

export const useSaveDraft = (close: () => void) => {
  const { boardId, setBoardId, title, tagList, boardHeadImageUrl } =
    usePostContent();
  const { editor } = useCurrentEditor();

  const handleSuccess = () => {
    close();
    toast.success('작성 중인 글이 저장되었습니다.');
  };

  const handleError = () => toast.error('작성 글 저장에 실패했습니다.');

  const saveDraft = async () => {
    if (!editor) return;

    if (title.length === 0) {
      toast.warn('제목을 작성해주세요.');
      return;
    }

    if (boardId) {
      await editDraft(
        {
          id: boardId,
          title,
          contents: editor.getHTML(),
          categoryName: tagList,
          boardHeadImageUrl,
        },
        { onSuccess: handleSuccess, onError: handleError }
      );
    } else {
      const newBoardId = await createDraft(
        {
          title,
          contents: editor.getHTML(),
          categoryName: tagList,
          boardType: 'SEMINAR',
          boardHeadImageUrl,
        },
        { onSuccess: handleSuccess, onError: handleError }
      );
      if (newBoardId) {
        setBoardId(newBoardId);
      }
    }
  };

  return { saveDraft };
};
