'use client';

import QnACard from './QnACard';
import QnAField from './QnAField';
import styles from './qnaSection.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import useSocketStore from '@/app/lib/stores/socketStore';
import { END_POINTS } from '@/app/lib/constants/common/path';
import { UserRoleValidator } from '@/app/lib/apis/userRoleValidator';

type addQnaRequestDto = {
  content: string;
  anonymous: boolean;
};

const defaultValues = {
  content: '',
  anonymous: false,
};

interface Props {
  userRole: string;
}

export default function QnASection({ userRole }: Props) {
  const { stompClient, streamId, qnaList } = useSocketStore();
  const formState = useForm({ defaultValues });
  const userRoleValidator = new UserRoleValidator();

  const onSubmit = async (data: addQnaRequestDto) => {
    if (!data.content) {
      return;
    }

    if (stompClient) {
      if (!userRoleValidator.guest(userRole)) {
        alert('로그인 후 이용가능합니다.');
        return;
      }
      if (!userRoleValidator.user(userRole)) {
        alert('권한이 없습니다.');
        return;
      }
      const newQna = {
        ...data,
      };
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
          <QnACard key={qna.qnaId} userRole={userRole} {...qna} />
        ))}
      </div>
    </div>
  );
}
