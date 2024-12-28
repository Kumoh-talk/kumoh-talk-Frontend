import { z } from 'zod';

const ERROR_MSG = {
  required: '필수 입력 항목입니다.',
  exceed: {
    title: '50자 이내로 입력해주세요.',
    summary: '100자 이내로 입력해주세요.',
    content: '1000자 이내로 입력해주세요.',
    recruitmentTarget: '50자 이내로 입력해주세요.',
    activityCycle: '50자 이내로 입력해주세요.',
  },
  studentId: '올바른 학번을 입력해주세요.',
  phoneNumber: '올바른 전화번호를 입력해주세요.',
  preferredDate: '올바른 날짜 형식(YYYY-MM-DD)을 입력해주세요.',
};

export const seminarFormSchema = z.object({
  title: z.string().min(1, ERROR_MSG.required).max(50, ERROR_MSG.exceed.title),
  summary: z
    .string()
    .min(1, ERROR_MSG.required)
    .max(100, ERROR_MSG.exceed.summary),
  content: z
    .string()
    .min(1, ERROR_MSG.required)
    .max(1000, ERROR_MSG.exceed.content),
  recruitmentTarget: z
    .string()
    .min(1, ERROR_MSG.required)
    .max(50, ERROR_MSG.exceed.recruitmentTarget),
  recruitmentNum: z.date(),
  recruitmentDeadline: z.date(),
  activityStart: z.date(),
  activityFinish: z.string().min(1, ERROR_MSG.required),
  activityCycle: z
    .string()
    .min(1, ERROR_MSG.required)
    .max(50, ERROR_MSG.exceed.activityCycle),
});

export type SeminarFormValues = z.infer<typeof seminarFormSchema>;

export const validateSeminarForm = (formData: FormData) => {
  const formValues = Object.fromEntries(formData.entries());

  return seminarFormSchema.safeParse(formValues);
};
