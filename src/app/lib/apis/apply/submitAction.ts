'use server';

import { validateSeminarForm } from '@/app/lib/schemas/seminarFormSchema';
import { FormState } from '@/app/lib/types/apply/formState';

export default async function submitAction(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const result = validateSeminarForm(formData);

  if (!result.success) {
    const { fieldErrors } = result.error.flatten();

    return {
      code: 'VALIDATION_ERROR',
      fieldErrors,
    };
  }

  return {
    code: 'SUCCESS',
    message: '세미나 신청 성공',
  };
}
