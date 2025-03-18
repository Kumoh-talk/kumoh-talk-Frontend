'use client';

import { getRecruitmentBoardQuestionForm } from '@/app/lib/apis/recruitment-boards/recruitmentBoard';
import { PostForm } from '@/app/lib/types/recruitmentBoards/post/postForm';
import { createContext, useEffect, useState } from 'react';

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
  boardId?: string;
  children: React.ReactNode;
}

export function PostProvider({ boardId, children }: Props) {
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

  useEffect(() => {
    async function fetchQuestionForm() {
      if (!boardId) {
        return;
      }

      const { data } = await getRecruitmentBoardQuestionForm(boardId);
      const questions = Object.keys(data)
        .filter((key) => key !== 'questionId')
        .map((key) => {
          data[key].type = data[key].type.toLowerCase();

          return data[key];
        });
      setForm(questions);
    }

    fetchQuestionForm();
  }, [boardId]);

  return (
    <PostContext.Provider
      value={{ form, setForm, questionError, setQuestionError }}
    >
      {children}
    </PostContext.Provider>
  );
}
