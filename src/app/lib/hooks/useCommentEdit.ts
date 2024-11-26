import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState } from 'react';

type commentEditProps = {
  id: number,
  comment: string,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
}

type commentEditType = [string, (e: ChangeEvent<HTMLTextAreaElement>) => void, (e: KeyboardEvent<HTMLTextAreaElement>) => void];

export default function useCommentEdit({ id, comment, setIsEdit }: commentEditProps): commentEditType {
  const [content, setContent] = useState(comment);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    console.log(content);
  }

  const onSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      console.log(`${id}번 댓글이 ${content}로 수정 완료되었습니다.`);
      setIsEdit(false);
    }
  }

  return [content, onChange, onSubmit];
}