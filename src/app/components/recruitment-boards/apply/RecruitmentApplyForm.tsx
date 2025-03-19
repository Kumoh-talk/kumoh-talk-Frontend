'use client';

import { FormProvider, useForm } from 'react-hook-form';
import RecruitmentApplyFormField from './RecruitmentApplyFormField';
import { Questions } from '@/app/lib/types/recruitmentBoards/apply/apply';
import { postApplication } from '@/app/lib/apis/recruitment-boards/apply/post';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { recruitmentApplySchema } from './../../../lib/schemas/recruitmentApplySchema';
import ApplyPeriodEnded from './ApplyPeriodEnded';
export interface Props {
  recruitmentBoardId: string;
  questions: Questions[];
  isQuestionsError: boolean;
}

function parseFormDataToRequestBody(data: { [key: string]: string }) {
  const result = Object.entries(data).map(([key, value]) => {
    if (typeof value === 'string') {
      return {
        questionId: Number(key),
        answerList: [value ? { answer: value } : null],
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
  isQuestionsError,
}: Props) {
  const defaultValues = questions
    ? Object.fromEntries(
        questions?.map(({ questionId, type }) => [
          questionId,
          type === 'DESCRIPTION' ? '' : [],
        ])
      )
    : {};
  const router = useRouter();
  const schema = questions && recruitmentApplySchema(questions);
  const formState = useForm({ defaultValues, resolver: zodResolver(schema) });

  if (isQuestionsError) {
    return <ApplyPeriodEnded recruitmentBoardId={recruitmentBoardId} />;
  }

  const onSubmit = async (data: { [key: string]: any }) => {
    const formData = parseFormDataToRequestBody(data);
    const response = await postApplication(recruitmentBoardId, formData);

    if (response.success === 'true') {
      router.back();
    } else {
      alert('이미 신청 이력이 있거나 신청 기간이 아닙니다.');
    }
  };
  const onError = (error: any) => {
    console.error(error);
  };

  return (
    <FormProvider {...formState}>
      <form onSubmit={formState.handleSubmit(onSubmit, onError)} noValidate>
        <RecruitmentApplyFormField questions={questions} />
      </form>
    </FormProvider>
  );
}
