'use client';

import { useFormContext } from 'react-hook-form';
import InputField from '../../apply/Field/InputField';
import styles from './postFormFiled.module.scss';
import Button from '../../common/button/Button';
import FormLabel from '../../apply/Form/FormLabel';
import CreatePostForm from './CreatePostForm';
import TextareaField from '../../apply/Field/TextareaField';

const getButtonText = (isSubmitting: boolean, modifyId?: string) => {
  if (modifyId) {
    return isSubmitting ? '수정중' : '수정하기';
  }
  return isSubmitting ? '등록중' : '등록하기';
};

export default function PostFormField({
  modifyId,
  questionError,
}: {
  modifyId?: string;
  questionError: string;
}) {
  const {
    formState: { isSubmitting },
    control,
  } = useFormContext();

  return (
    <div className={styles.fields}>
      <div className={styles.row}>
        <InputField control={control} name='title' label='제목' />
      </div>
      <div className={styles.row}>
        <InputField control={control} name='summary' label='부제목' />
      </div>
      <div className={styles.row}>
        <InputField control={control} name='host' label='주최자' />
      </div>
      <div className={styles.row}>
        <InputField
          control={control}
          name='recruitmentTarget'
          label='모집대상'
        />
        <InputField
          control={control}
          name='recruitmentNum'
          label='모집인원'
          type='number'
        />
      </div>
      <div className={styles.row}>
        <InputField
          control={control}
          name='currentMemberNum'
          label='현재인원'
          type='number'
        />
      </div>
      <div className={styles.row}>
        <InputField
          control={control}
          name='recruitmentDeadline'
          label='모집마감일'
          type='date'
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className={styles.row}>
        <InputField
          control={control}
          name='activityStart'
          label='활동시작일'
          type='date'
          min={new Date().toISOString().split('T')[0]}
        />
        <InputField
          control={control}
          name='activityFinish'
          label='활동종료일'
          type='date'
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className={styles.row}>
        <InputField control={control} name='activityCycle' label='활동주기' />
      </div>
      <div className={styles.row}>
        <TextareaField control={control} name='content' label='세부내용' />
      </div>
      <div className={styles.postFormCreate}>
        <FormLabel>신청폼 만들기</FormLabel>
        <span className={styles.questionError}>{questionError}</span>
        <hr />
        <CreatePostForm />
      </div>
      <div className={styles.row}>
        <Button type='submit' size='full' disabled={isSubmitting}>
          {getButtonText(isSubmitting, modifyId)}
        </Button>
      </div>
    </div>
  );
}
