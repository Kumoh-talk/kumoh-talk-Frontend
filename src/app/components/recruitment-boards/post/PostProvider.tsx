'use client';

import { PostForm } from '@/app/lib/types/recruitmentBoards/post/postForm';
import { createContext, useState } from 'react';

export const PostContext = createContext<{
  form: PostForm[];
  setForm: (state: PostForm[]) => void;
}>({
  form: [
    {
      number: 1,
      question: '',
      type: 'description',
      isEssential: false,
      answerList: [],
    },
  ],
  setForm: () => {},
});

export interface Props {
  children: React.ReactNode;
}

export function PostProvider({ children }: Props) {
  const [form, setForm] = useState<PostForm[]>([
    {
      number: 1,
      question: '',
      type: 'description',
      isEssential: false,
      answerList: [],
    },
  ]);

  return (
    <PostContext.Provider value={{ form, setForm }}>
      {children}
    </PostContext.Provider>
  );
}
