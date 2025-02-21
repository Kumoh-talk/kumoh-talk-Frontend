import { useState } from 'react';
import { postRecruitmentBoardComment } from '../apis/recruitment-boards/recruitmentBoard';

export default function useReply(
  boardId: number,
  parentId: number,
  setIsReply: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [content, setContent] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onCancel = () => {
    setContent('');
    setIsReply(false);
  };

  const onReply = async () => {
    const response = await postRecruitmentBoardComment(boardId.toString(), {
      content,
      groupId: parentId,
    });

    window.location.reload();
  };

  return {
    content,
    onChange,
    onCancel,
    onReply,
  };
}
