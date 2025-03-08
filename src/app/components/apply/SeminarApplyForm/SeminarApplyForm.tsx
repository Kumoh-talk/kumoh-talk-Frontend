'use client';

import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { FormProvider } from 'react-hook-form';
import submitAction from '@/app/lib/apis/apply/submitAction';
import { useFormAction } from '@/app/lib/hooks/apply/useFormAction';
import FormFields from '../FormFields/FormFields';
import {
  getMyAdditionalInformation,
  submitSeminarApplication,
} from '@/app/lib/apis/apply/seminarApplication';
import { getInitFormValues } from '@/app/lib/utils/post/parseAdditionalInfo';
import type { SeminarFormValues } from '@/app/lib/schemas/seminarFormSchema';
import styles from './SeminarApplyForm.module.scss';

const SeminarApplyForm = () => {
  const [formState, formAction] = useFormState(submitAction, null);
  const [isLoading ,setIsLoading] = useState(true);

  const form = useFormAction<SeminarFormValues>({
    formState,
    onSuccess: () => {
      submitSeminarApplication(form.getValues());
    },
  });

  useEffect(() => {
    const initFormValues = async () => {
      const response = await getMyAdditionalInformation();
      const { department, studentId, grade, phoneNumber } = response.data;

      const initFormValues = getInitFormValues({
        department,
        studentId,
        grade,
        phoneNumber,
      });

      setIsLoading(false);
      form.reset(initFormValues);
    };

    initFormValues();
  }, []);

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <FormProvider {...form}>
      <form className={styles.seminarApplyForm} action={formAction}>
        <FormFields />
      </form>
    </FormProvider>
  );
};

export default SeminarApplyForm;
