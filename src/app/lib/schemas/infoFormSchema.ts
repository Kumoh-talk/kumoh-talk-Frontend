import { z } from 'zod';
import { departmentValues } from '@/app/lib/constants/apply/selectValues';

const REGEX = {
  studentId: /^\d{10}$/,
  phoneNumber: /^010-\d{4}-\d{4}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

const ERROR_MSG = {
  required: '필수 입력 항목입니다.',
  studentId: '올바른 학번을 입력해주세요.',
  phoneNumber: '올바른 전화번호를 입력해주세요.',
  email: '올바른 이메일 주소를 입력해주세요.',
};

export const infoFormSchema = z.object({
  studentStatus: z.enum(['재학', '휴학', '졸업']),
  department: z.enum(departmentValues),
  grade: z.enum(['1', '2', '3', '4']),
  studentId: z
    .string()
    .min(1, ERROR_MSG.required)
    .regex(REGEX.studentId, ERROR_MSG.studentId),
  phoneNumber: z
    .string()
    .min(1, ERROR_MSG.required)
    .regex(REGEX.phoneNumber, ERROR_MSG.phoneNumber),
  email: z
    .string()
    .min(1, ERROR_MSG.required)
    .regex(REGEX.email, ERROR_MSG.email),
});

export type InfoFormValues = z.infer<typeof infoFormSchema>;

export const validateInfoForm = (formData: FormData) => {
  const formValues = Object.fromEntries(formData.entries());

  return infoFormSchema.safeParse(formValues);
};
