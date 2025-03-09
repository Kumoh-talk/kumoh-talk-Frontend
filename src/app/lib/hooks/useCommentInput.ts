import { useTransition } from 'react';
import useInput from './useInput';
import { postRecruitmentBoardComment } from '../apis/recruitment-boards/recruitmentBoard';

export default function useCommentInput(boardId: string) {
  const [content, onChange, reset] = useInput({ comment: '' });
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      if (!content.comment) {
        return;
      }
      const commentBody = {
        groupId: null,
        content: content.comment,
      };
      await postRecruitmentBoardComment(boardId, commentBody);

      reset();
      window.location.reload();
    });
  };

  return { comment: content.comment, onChange, reset, onSubmit, isPending };
}
