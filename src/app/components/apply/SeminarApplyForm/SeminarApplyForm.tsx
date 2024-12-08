'use client';

import { useFormState } from 'react-dom';
import { FormProvider } from 'react-hook-form';
import submitAction from '@/app/lib/apis/apply/submitAction';
import { useFormAction } from '@/app/lib/hooks/apply/useFormAction';
import FormFields from '../FormFields/FormFields';
import type { SeminarFormValues } from '@/app/lib/schemas/seminarFormSchema';
import styles from './SeminarApplyForm.module.scss';
import { departmentValues } from '@/app/lib/constants/apply/selectValues';
import { getDateForWeekday } from '@/app/lib/utils/dateUtils';

const SeminarApplyForm = () => {
  const [formState, formAction] = useFormState(submitAction, null);
  const form = useFormAction<SeminarFormValues>({
    formState,
    defaultValues: {
      department: departmentValues[0],
      grade: '1',
      preferredDate: getDateForWeekday(4),
    },
  });

  return (
    <FormProvider {...form}>
      <form className={styles.seminarApplyForm} action={formAction}>
        <FormFields />
      </form>
    </FormProvider>
  );
};

export default SeminarApplyForm;
