import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  useTransition,
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
  () => void,
  boolean
];

export default function useCommentEdit({
  id,
  groupId = null,
  currentComment,
  setIsEdit,
}: commentEditProps): commentEditType {
  const [content, setContent] = useState(currentComment);
  const [isPending, startTransition] = useTransition();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    startTransition(async () => {
      await patchRecruitmentBoardComment(id, { groupId, content });

      if (setIsEdit) setIsEdit(false);
    });
  };

  return [content, onChange, onSubmit, isPending];
}
