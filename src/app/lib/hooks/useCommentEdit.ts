import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from 'react';
import { patchRecruitmentBoardComment } from '../apis/recruitment-boards/recruitmentBoard';

type commentEditProps = {
  id: number;
  groupId?: number | null;
  currentComment: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

type commentEditType = [
  string,
  (e: ChangeEvent<HTMLTextAreaElement>) => void,
  (e: KeyboardEvent<HTMLTextAreaElement>) => void
];

export default function useCommentEdit({
  id,
  groupId = null,
  currentComment,
  setIsEdit,
}: commentEditProps): commentEditType {
  const [content, setContent] = useState(currentComment);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSubmit = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      await patchRecruitmentBoardComment(id, { groupId, content });

      if (setIsEdit) setIsEdit(false);
    }
  };

  return [content, onChange, onSubmit];
}
