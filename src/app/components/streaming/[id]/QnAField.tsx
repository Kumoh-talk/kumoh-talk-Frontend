import React from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '../../common/button/Button';
import Switch from '../../common/Switch/Switch';
import styles from './qnaField.module.scss';

interface QnAFormValues {
  content: string;
  anonymous: boolean;
}

export default function QnAField() {
  const {
    formState: { isSubmitting },
    register,
    setValue,
    watch,
  } = useFormContext<QnAFormValues>();

  const anonymous = watch('anonymous', false);

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setValue('anonymous', checked);
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
          <Switch checked={anonymous} onChange={handleSwitchChange} />
          <p>익명</p>
        </div>
        <Button type='submit' disabled={isSubmitting}>
          등록
        </Button>
      </div>
    </>
  );
}
