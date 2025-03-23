import { toast } from 'react-toastify';
import { useCurrentEditor } from '@tiptap/react';
import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
import { createDraft, editDraft } from '@/app/lib/apis/post/saveDraft';
import { useInitBoardId } from '@/app/lib/hooks/post/useInitBoardId';
import { includesCustomNode, findBoardHeadImageUrl } from '@/app/lib/utils/post/editorFileUtils';
import { saveAttaches, getReplacedContents } from '@/app/lib/apis/post/saveFiles';

export const useSaveDraft = (close: () => void) => {
  const { boardId, setBoardId, title, tagList, setBoardHeadImageUrl, boardType } =
    usePostContent();
  const { editor } = useCurrentEditor();
  const { initBoardId } = useInitBoardId();

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

    const imageNode = includesCustomNode(editor, 'IMAGE');
    const attachNode = includesCustomNode(editor, 'ATTACH');

    let contents = editor.getHTML();
    let boardHeadImageUrl = '';

    if (boardId) {
      if (imageNode) {
        contents = await getReplacedContents(editor, boardId);
        boardHeadImageUrl = findBoardHeadImageUrl(contents) ?? '';
        setBoardHeadImageUrl(boardHeadImageUrl);
        editor.commands.setContent(contents);
      }

      if (attachNode) {
        contents = await saveAttaches(editor, boardId);
        editor.commands.setContent(contents);
      }

      await editDraft(
        {
          id: boardId,
          title,
          contents,
          categoryName: tagList,
          boardHeadImageUrl,
        },
        { onSuccess: handleSuccess, onError: handleError }
      );

      return;
    }

    if (imageNode || attachNode) {
      const newBoardId = await initBoardId();

      if (!newBoardId) {
        toast.error('작성 글 저장에 실패했습니다.');
        return;
      }

      setBoardId(newBoardId);

      if (imageNode) {
        contents = await getReplacedContents(editor, newBoardId);
        boardHeadImageUrl = findBoardHeadImageUrl(contents) ?? '';
        setBoardHeadImageUrl(boardHeadImageUrl);
        editor.commands.setContent(contents);
      }

      if (attachNode) {
        contents = await saveAttaches(editor, newBoardId);
        editor.commands.setContent(contents);
      }

      await editDraft(
        {
          id: newBoardId,
          title,
          contents,
          categoryName: tagList,
          boardHeadImageUrl,
        },
        { onSuccess: handleSuccess, onError: handleError }
      );

      return;
    }

    const newBoardId = await createDraft(
      {
        title,
        contents,
        categoryName: tagList,
        boardHeadImageUrl,
        boardType,
      },
      { onSuccess: handleSuccess, onError: handleError }
    );

    if (newBoardId) setBoardId(newBoardId);
  };

  return { saveDraft };
};
