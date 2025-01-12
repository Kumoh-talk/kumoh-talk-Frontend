import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from 'react';

type commentEditProps = {
  id: number;
  groupId?: number | null;
  comment: string;
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
  comment,
  setIsEdit,
}: commentEditProps): commentEditType {
  const [content, setContent] = useState(comment);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    console.log(content);
  };

  const onSubmit = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN || '';
      try {
        const response = await fetch(`${API_URL}/api/v1/comments/${id}`, {
          method: 'PATCH',
          redirect: 'follow',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content,
            groupId,
          }),
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error(error);
      }

      if (setIsEdit) setIsEdit(false);
    }
  };

  return [content, onChange, onSubmit];
}
