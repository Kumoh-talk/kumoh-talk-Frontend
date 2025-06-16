'use client';

import { Bookmark } from 'lucide-react';
import styles from './addBookmarkField.module.scss';
import { useForm } from 'react-hook-form';
import Button from '../../common/button/Button';
import { bookmarkPostAction } from '@/app/lib/utils/bookmarkPostAction';

const defaultValues = {
  title: '',
};

interface Props {
  vodId: string;
  curTime: string;
}

export default function AddBookmarkField({ vodId, curTime }: Props) {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm({ defaultValues });

  const onSubmit = async (data: { title: string }) => {
    const formData = new FormData();
    formData.append('vodId', vodId);
    formData.append('title', data.title);
    formData.append('time', curTime);

    await bookmarkPostAction(formData);
  };

  const onError = (error: unknown) => {
    console.error(error);
  };

  return (
    <div className={styles.addBookmarkField}>
      <div className={styles.header}>
        <Bookmark color='black' />
        {curTime}
      </div>
      <form
        className={styles.inputField}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <input
          type='text'
          placeholder='북마크 제목'
          {...register('title', { required: true })}
        />
        <Button disabled={isSubmitting}>저장</Button>
      </form>
    </div>
  );
}
