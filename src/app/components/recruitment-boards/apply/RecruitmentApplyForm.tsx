'use client';

import { FormProvider, useForm } from 'react-hook-form';
import RecruitmentApplyFormField from './RecruitmentApplyFormField';
import { Questions } from '@/app/lib/types/recruitmentBoards/apply/apply';
export interface Props {
  questions: Questions[];
}

export default function RecruitmentApplyForm({ questions }: Props) {
  const defaultValues = Object.fromEntries(
    questions.map(({ questionId }) => [questionId, ''])
  );

  const formState = useForm({ defaultValues });

  const onSubmit = (data: { [key: string]: string }) => console.log(data);
  const onError = (error: any) => console.error(error);

  return (
    <FormProvider {...formState}>
      <form onSubmit={formState.handleSubmit(onSubmit, onError)} noValidate>
        <RecruitmentApplyFormField questions={questions} />
      </form>
    </FormProvider>
  );
}
