'use client';

import { useEffect } from 'react';
import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
import { getBoard } from '@/app/lib/apis/post/boards';
import { useCurrentEditor } from '@tiptap/react';
import { toast } from 'react-toastify';

interface BoardInitializerProps {
  boardId: number;
}

const BoardInitializer = ({ boardId }: BoardInitializerProps) => {
  const { setBoardId, setTitle, setTagList, setBoardHeadImageUrl } =
    usePostContent();
  const { editor } = useCurrentEditor();

  useEffect(() => {
    if (!boardId || !editor) return;

    const initBoard = async () => {
      try {
        const response = await getBoard(boardId);

        if (response.success === 'true') {
          const { title, contents, categoryNames, boardHeadImageUrl } =
            response.data;
          setBoardId(boardId);
          setTitle(title);
          setTagList(categoryNames);
          setBoardHeadImageUrl(boardHeadImageUrl?.split('?')[0] || '');
          editor.commands.setContent(contents);
        }
      } catch (error) {
        toast.error('게시글 데이터를 불러오는데 실패했습니다.');
      }
    };

    initBoard();
  }, [boardId, editor]);

  return null;
};

export default BoardInitializer;
