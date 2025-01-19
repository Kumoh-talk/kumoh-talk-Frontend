'use client';

import { FormProvider } from 'react-hook-form';
import PostFormField from './PostFormField';
import usePostForm from '@/app/lib/hooks/post/usePostForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { postFormSchema } from '@/app/lib/schemas/postFormSchema';

export default function PostForm() {
  const { formState, onSubmit, onError, questionError } = usePostForm({
    resolver: zodResolver(postFormSchema),
  });

  return (
    <FormProvider {...formState}>
      <form onSubmit={formState.handleSubmit(onSubmit, onError)} noValidate>
        <PostFormField questionError={questionError} />
      </form>
    </FormProvider>
  );
}
