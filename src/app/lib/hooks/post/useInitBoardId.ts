import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
import { postDraft } from '@/app/lib/apis/post/boards';
import type { PostBoards } from '@/app/lib/types/post/boards';

export const useInitBoardId = () => {
  const { boardId, title, boardType } = usePostContent();

  const initBoardId = async () => {
    if (boardId) return;

    const initData: PostBoards = {
      title,
      contents: '<p></p>',
      categoryName: [],
      boardType,
    };

    try {
      const response = await postDraft(initData);

      if (response.success === 'true') {
        const { boardId } = response.data;

        return boardId;
      } else {
        console.error('boardId 초기화 오류');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { initBoardId };
};
