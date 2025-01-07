'use client';

import { FormProvider } from 'react-hook-form';
import PostFormField from './PostFormField';
import usePostForm from '@/app/lib/hooks/post/usePostForm';

export default function PostForm() {
  const { formState, onSubmit, onError } = usePostForm();

  return (
    <FormProvider {...formState}>
      <form onSubmit={formState.handleSubmit(onSubmit, onError)} noValidate>
        <PostFormField />
      </form>
    </FormProvider>
  );
}
