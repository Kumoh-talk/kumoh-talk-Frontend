import { KeyboardEvent } from 'react';
import useInput from './useInput';
import { postRecruitmentBoardComment } from '../apis/recruitment-boards/recruitmentBoard';

export default function useCommentInput(boardId: string) {
  const [content, onChange, reset] = useInput({ comment: '' });

  const onSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!content.comment) {
      return;
    }

    if (e.key === 'Enter') {
      const commentBody = {
        groupId: null,
        content: content.comment,
      };
      postRecruitmentBoardComment(boardId, commentBody);

      reset();
      window.location.reload();
    }
  };

  return { content, onChange, reset, onSubmit };
}
