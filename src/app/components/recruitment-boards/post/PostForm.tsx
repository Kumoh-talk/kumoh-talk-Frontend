'use client';

import { FormProvider, useForm } from 'react-hook-form';
import PostFormField from './PostFormField';
import { useContext } from 'react';
import { TabsContext } from './TabsProvider';
import { PostContext } from './PostProvider';
import { PostBoard } from '@/app/lib/types/recruitmentBoards/post/postBoard';

const defaultValues: PostBoard = {
  title: '',
  summary: '',
  host: '',
  content: '',
  recruitmentTarget: '',
  recruitmentNum: 0,
  currentMemberNum: 0,
  recruitmentDeadline: '',
  activityStart: '',
  activityFinish: '',
  activityCycle: '',
};

export default function PostForm() {
  const { state } = useContext(TabsContext);
  const { form } = useContext(PostContext);
  const formState = useForm({ defaultValues });

  const onSubmit = (data: PostBoard) => {
    const formData = {
      board: {
        ...state,
        ...data,
      },
      form,
    };
    console.log(formData);
  };
  const onError = (error: unknown) => console.log(error);

  return (
    <FormProvider {...formState}>
      <form onSubmit={formState.handleSubmit(onSubmit, onError)} noValidate>
        <PostFormField />
      </form>
    </FormProvider>
  );
}
