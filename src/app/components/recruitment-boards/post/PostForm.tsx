'use client';

import { FormProvider, useForm } from 'react-hook-form';
import PostFormField from './PostFormField';

export default function PostForm() {
  const defaultValues = {
    title: '',
    summary: '',
    content: '',
    recruitmentTarget: '',
    recruitmentNum: '',
    recruitmentDeadline: '',
    activityStart: '',
    activityFinish: '',
    activityCycle: '',
  };

  const formState = useForm({ defaultValues });

  return (
    <FormProvider {...formState}>
      <form>
        <PostFormField />
      </form>
    </FormProvider>
  );
}
