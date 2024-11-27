import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState } from 'react';

type commentEditProps = {
  id: number,
  comment: string,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
}

type commentEditType = [string, (e:ChangeEvent<HTMLInputElement>) => void, (e:KeyboardEvent<HTMLInputElement>) => void];

export default function useCommentEdit({ id, comment, setIsEdit }: commentEditProps): commentEditType {
  const [content, setContent] = useState(comment);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    console.log(content);
  }

  const onSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(`${id}번 댓글이 ${content}로 수정 완료되었습니다.`);
      setIsEdit(false);
    }
  }

  return [content, onChange, onSubmit];
}