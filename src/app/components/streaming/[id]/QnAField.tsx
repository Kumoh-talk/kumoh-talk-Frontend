import React from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '../../common/button/Button';
import Switch from '../../common/Switch/Switch';
import styles from './qnaField.module.scss';

interface QnAFormValues {
  content: string;
  isAnonymity: boolean;
}

export default function QnAField() {
  const {
    formState: { isSubmitting },
    register,
    setValue,
    watch,
  } = useFormContext<QnAFormValues>();

  const isAnonymity = watch('isAnonymity', false);

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setValue('isAnonymity', checked);
  };

  return (
    <>
      <textarea
        className={styles.qnaInput}
        placeholder='질문을 입력하세요.'
        {...register('content')}
      />
      <div className={styles.actions}>
        <div className={styles.anonymitySwitch}>
          <Switch checked={isAnonymity} onChange={handleSwitchChange} />
          <p>익명</p>
        </div>
        <Button type='submit' disabled={isSubmitting}>
          등록
        </Button>
      </div>
    </>
  );
}
