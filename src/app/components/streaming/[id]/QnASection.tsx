'use client';

import QnAField from './QnAField';
import styles from './qnaSection.module.scss';
import { FormProvider, useForm } from 'react-hook-form';

const defaultValues = {
  content: '',
  isAnonymity: false,
};

export default function QnASection() {
  const formState = useForm({ defaultValues });

  const onSubmit = async (data: unknown) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  const onError = (error: unknown) => {
    console.error(error);
  };

  return (
    <div className={styles.qnaWrapper}>
      <FormProvider {...formState}>
        <form onSubmit={formState.handleSubmit(onSubmit, onError)}>
          <QnAField />
        </form>
      </FormProvider>
      <div className={styles.listWrapper}>질문 리스트 나오는 곳</div>
    </div>
  );
}
