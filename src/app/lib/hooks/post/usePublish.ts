import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useCurrentEditor } from '@tiptap/react';
import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
import { publishDraft } from '@/app/lib/apis/post/saveDraft';
import { useInitBoardId } from '@/app/lib/hooks/post/useInitBoardId';
import { includesCustomNode, findBoardHeadImageUrl } from '@/app/lib/utils/post/editorFileUtils';
import { saveAttaches, getReplacedContents } from '@/app/lib/apis/post/saveFiles';

export const usePublish = () => {
  const { boardId, setBoardId, title, tagList, setBoardHeadImageUrl, boardType } =
    usePostContent();
  const { editor } = useCurrentEditor();
  const { initBoardId } = useInitBoardId();
  const router = useRouter();
  
  const handleSuccess = () => {
    toast.success('작성 중인 글이 게시되었습니다.');
    close();
    router.push('/');
  };

  const handleError = () => toast.error('작성 글 게시 중 오류가 생겼습니다.');

  const publishBoard = async () => {
    if (!editor) return;

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

      await publishDraft(
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
        toast.error('작성 글 게시 중 오류가 생겼습니다.');
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

      await publishDraft(
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

    const newBoardId = await initBoardId();

    if (!newBoardId) {
      toast.error('작성 글 게시 중 오류가 생겼습니다.');
      return;
    }

    setBoardId(newBoardId);

    await publishDraft(
      {
        id: newBoardId,
        title,
        contents,
        categoryName: tagList,
        boardHeadImageUrl,
      },
      { onSuccess: handleSuccess, onError: handleError }
    );
  };

  return { publishBoard };
};
