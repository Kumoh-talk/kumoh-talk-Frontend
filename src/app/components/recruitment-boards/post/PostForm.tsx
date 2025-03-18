'use client';

import { FormProvider } from 'react-hook-form';
import PostFormField from './PostFormField';
import usePostForm from '@/app/lib/hooks/post/usePostForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { postFormSchema } from '@/app/lib/schemas/postFormSchema';
import { PostBoard } from '@/app/lib/types/recruitmentBoards/post/postBoard';
import Tabs from './Tabs';

export default function PostForm({
  defaultValues,
}: {
  defaultValues: PostBoard;
}) {
  const { formState, onSubmit, onError, questionError } = usePostForm({
    defaultValues,
    resolver: zodResolver(postFormSchema),
  });

  return (
    <FormProvider {...formState}>
      <form onSubmit={formState.handleSubmit(onSubmit, onError)} noValidate>
        <Tabs />
        <PostFormField questionError={questionError} />
      </form>
    </FormProvider>
  );
}
