'use client';

import { Qna } from '@/app/lib/types/streaming/streaming';
import QnACard from './QnACard';
import QnAField from './QnAField';
import styles from './qnaSection.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import useSocketStore from '@/app/lib/stores/socketStore';

const defaultValues = {
  content: '',
  isAnonymity: false,
};

export default function QnASection() {
  const { qnaList } = useSocketStore();
  const formState = useForm({ defaultValues });

  const onSubmit = async (data: unknown) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    formState.setValue('content', '');
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
      <div className={styles.listWrapper}>
        {qnaList.map((qna) => (
          <QnACard key={qna.qnaId} {...qna} />
        ))}
      </div>
    </div>
  );
}
