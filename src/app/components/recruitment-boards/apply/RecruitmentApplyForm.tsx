'use client';

import { FormProvider, useForm } from 'react-hook-form';
import RecruitmentApplyFormField from './RecruitmentApplyFormField';
import { Questions } from '@/app/lib/types/recruitmentBoards/apply/apply';
import { postApplication } from '@/app/lib/apis/recruitment-boards/apply/post';
import { useRouter } from 'next/navigation';
export interface Props {
  recruitmentBoardId: string;
  questions: Questions[];
}

function parseFormDataToRequestBody(data: { [key: string]: string }) {
  const result = Object.entries(data).map(([key, value]) => {
    if (typeof value === 'string') {
      return {
        questionId: Number(key),
        answerList: [{ answer: value }],
      };
    }
    return {
      questionId: Number(key),
      answerList: value,
    };
  });

  return { application: result };
}

export default function RecruitmentApplyForm({
  recruitmentBoardId,
  questions,
}: Props) {
  const defaultValues = Object.fromEntries(
    questions.map(({ questionId }) => [questionId, ''])
  );
  const router = useRouter();
  const formState = useForm({ defaultValues });

  const onSubmit = async (data: { [key: string]: string }) => {
    const formData = parseFormDataToRequestBody(data);
    const response = await postApplication(recruitmentBoardId, formData);
    console.log(response);

    if (response.success === 'true') {
      router.back();
    }
  };
  const onError = (error: any) => console.error(error);

  return (
    <FormProvider {...formState}>
      <form onSubmit={formState.handleSubmit(onSubmit, onError)} noValidate>
        <RecruitmentApplyFormField questions={questions} />
      </form>
    </FormProvider>
  );
}
