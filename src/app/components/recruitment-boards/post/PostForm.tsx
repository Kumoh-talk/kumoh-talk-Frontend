'use client';

import { FormProvider, useForm } from 'react-hook-form';
import PostFormField from './PostFormField';

export default function PostForm() {
  const defaultValues = {
    title: '',
    summary: '',
    host: '',
    content: '',
    recruitmentTarget: '',
    recruitmentNum: '',
    recruitmentDeadline: '',
    activityStart: '',
    activityFinish: '',
    activityCycle: '',
  };

  const formState = useForm({ defaultValues });

  const onSubmit = (data: unknown) => console.log(data);
  const onError = (error: unknown) => console.log(error);

  return (
    <FormProvider {...formState}>
      <form onSubmit={formState.handleSubmit(onSubmit, onError)} noValidate>
        <PostFormField />
      </form>
    </FormProvider>
  );
}
