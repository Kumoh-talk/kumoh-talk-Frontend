'use client';

import { FormProvider, useForm } from 'react-hook-form';
import RecruitmentApplyFormField from './RecruitmentApplyFormField';
import { PostBoard } from '@/app/lib/types/recruitmentBoards/post/postBoard';
import { useTransition } from 'react';

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

async function getQuestions() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  try {
    const response = await fetch(`${API_URL}/api/v1/recruitment-boards/form`);
    const result = await response.json();
    if (response.ok && 'success' in result && 'data' in result) {
      return result.data;
    } else {
      console.error('Failed to fetch data:', result);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default function RecruitmentApplyForm() {
  const formState = useForm({ defaultValues });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: PostBoard) => console.log(data);
  const onError = (error: any) => console.error(error);

  return (
    <FormProvider {...formState}>
      <form onSubmit={formState.handleSubmit(onSubmit, onError)} noValidate>
        <RecruitmentApplyFormField />
      </form>
    </FormProvider>
  );
}
