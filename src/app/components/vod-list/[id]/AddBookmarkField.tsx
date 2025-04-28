'use client';

import { Bookmark } from 'lucide-react';
import styles from './addBookmarkField.module.scss';
import { useForm } from 'react-hook-form';
import Button from '../../common/button/Button';

const defaultValues = {
  title: '',
};

interface Props {
  curTime: string;
}

export default function AddBookmarkField({ curTime }: Props) {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm({ defaultValues });

  const onSubmit = async (data: unknown) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
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
