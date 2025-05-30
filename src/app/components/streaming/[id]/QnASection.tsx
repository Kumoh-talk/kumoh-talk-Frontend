'use client';

import QnACard from './QnACard';
import QnAField from './QnAField';
import styles from './qnaSection.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import useSocketStore from '@/app/lib/stores/socketStore';
import { END_POINTS } from '@/app/lib/constants/common/path';

type addQnaRequestDto = {
  content: string;
  anonymous: boolean;
};

const defaultValues = {
  content: '',
  anonymous: false,
};

export default function QnASection() {
  const { stompClient, streamId, qnaList } = useSocketStore();
  const formState = useForm({ defaultValues });

  const onSubmit = async (data: addQnaRequestDto) => {
    if (stompClient) {
      const newQna = {
        nickname: '대용진',
        ...data,
      };
      console.log(newQna);
      stompClient.send(
        END_POINTS.PUBLISH.CREATE_QNA(JSON.stringify(streamId)),
        {},
        JSON.stringify(newQna)
      );
    }
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
