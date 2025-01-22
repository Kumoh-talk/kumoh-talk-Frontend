'use client';

import { PostForm } from '@/app/lib/types/recruitmentBoards/post/postForm';
import { createContext, useState } from 'react';

export const PostContext = createContext<{
  form: PostForm[];
  setForm: (state: PostForm[]) => void;
  questionError: string;
  setQuestionError: (state: string) => void;
}>({
  form: [
    {
      number: 1,
      question: '',
      type: 'description',
      isEssential: false,
      answerList: [],
      error: '',
    },
  ],
  setForm: () => {},
  questionError: '',
  setQuestionError: () => {},
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
      error: '',
    },
  ]);
  const [questionError, setQuestionError] = useState('');

  return (
    <PostContext.Provider
      value={{ form, setForm, questionError, setQuestionError }}
    >
      {children}
    </PostContext.Provider>
  );
}
