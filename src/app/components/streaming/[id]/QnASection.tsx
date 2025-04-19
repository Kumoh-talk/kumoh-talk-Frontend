'use client';

import QnACard from './QnACard';
import QnAField from './QnAField';
import styles from './qnaSection.module.scss';
import { FormProvider, useForm } from 'react-hook-form';

interface Props {
  qnaList: {
    qnaId: number;
    name: string;
    content: string;
    time: string;
    likes: number;
    isAnswered: boolean;
  }[];
}

const defaultValues = {
  content: '',
  isAnonymity: false,
};

export default function QnASection({ qnaList }: Props) {
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
      <div className={styles.listWrapper}>
        {qnaList.map((qna) => (
          <QnACard key={qna.qnaId} {...qna} />
        ))}
      </div>
    </div>
  );
}
