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
  accessToken?: string;
  userRole: string;
}

export default function QnASection({ accessToken, userRole }: Props) {
  const { stompClient, streamId, setLastSend, qnaList } = useSocketStore();
  const formState = useForm({ defaultValues });

  const onSubmit = async (data: addQnaRequestDto) => {
    if (!data.content) {
      return;
    }

    if (stompClient) {
      if (!UserRoleValidator.guest(userRole)) {
        alert('로그인 후 이용가능합니다.');
        return;
      }
      if (!UserRoleValidator.user(userRole)) {
        alert('권한이 없습니다.');
        return;
      }
      const newQna = {
        ...data,
      };
      setLastSend({
        destination: END_POINTS.PUBLISH.CREATE_QNA(JSON.stringify(streamId)),
        body: JSON.stringify(newQna),
      });
      stompClient.send(
        END_POINTS.PUBLISH.CREATE_QNA(JSON.stringify(streamId)),
        {
          Authorization: `Bearer ${accessToken}`,
        },
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
          <QnACard
            key={qna.qnaId}
            accessToken={accessToken}
            userRole={userRole}
            {...qna}
          />
        ))}
      </div>
    </div>
  );
}
