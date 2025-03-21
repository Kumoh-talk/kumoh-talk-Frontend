'use server';

import { validateInfoForm } from '../../schemas/infoFormSchema';
import { FormState } from '@/app/lib/types/apply/formState';

export default async function submitAction(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const result = validateInfoForm(formData);

  if (!result.success) {
    const { fieldErrors } = result.error.flatten();
    console.log(fieldErrors);

    return {
      code: 'VALIDATION_ERROR',
      fieldErrors,
    };
  }

  return {
    code: 'SUCCESS',
    message: '추가 정보 입력 성공',
  };
}
