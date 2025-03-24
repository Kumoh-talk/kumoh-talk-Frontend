import { z } from 'zod';

const ERROR_MSG = {
  required: '필수 입력 항목입니다.',
  numberRequired: '1 이상의 숫자를 입력해주세요.',
  exceed: {
    fifty: '50자 이내로 입력해주세요.',
    hundred: '100자 이내로 입력해주세요.',
    thousand: '1000자 이내로 입력해주세요.',
    recruitmentTarget: '50자 이내로 입력해주세요.',
    activityCycle: '50자 이내로 입력해주세요.',
  },
  studentId: '올바른 학번을 입력해주세요.',
  phoneNumber: '올바른 전화번호를 입력해주세요.',
  preferredDate: '올바른 날짜 형식(YYYY-MM-DD)을 입력해주세요.',
};

export const postFormSchema = z.object({
  title: z.string().min(1, ERROR_MSG.required).max(50, ERROR_MSG.exceed.fifty),
  summary: z
    .string()
    .min(1, ERROR_MSG.required)
    .max(100, ERROR_MSG.exceed.hundred),
  host: z.string().min(1, ERROR_MSG.required).max(50, ERROR_MSG.exceed.fifty),
  content: z
    .string()
    .min(1, ERROR_MSG.required)
    .max(1000, ERROR_MSG.exceed.thousand),
  type: z.string().min(1, ERROR_MSG.required),
  tag: z.string().min(1, ERROR_MSG.required),
  recruitmentTarget: z
    .string()
    .min(1, ERROR_MSG.required)
    .max(50, ERROR_MSG.exceed.recruitmentTarget),
  recruitmentNum: z.number().min(1, ERROR_MSG.numberRequired),
  currentMemberNum: z.number().min(1, ERROR_MSG.numberRequired),
  recruitmentDeadline: z.string().date(),
  activityStart: z.string().date(),
  activityFinish: z.string().date(),
  activityCycle: z
    .string()
    .min(1, ERROR_MSG.required)
    .max(50, ERROR_MSG.exceed.activityCycle),
});

export type SeminarFormValues = z.infer<typeof postFormSchema>;

export const validatePostForm = (formData: FormData) => {
  const formValues = Object.fromEntries(formData.entries());

  return postFormSchema.safeParse(formValues);
};
