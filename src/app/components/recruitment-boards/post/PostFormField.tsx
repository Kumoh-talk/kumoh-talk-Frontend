'use client';

import { useFormContext } from 'react-hook-form';
import InputField from '../../apply/Field/InputField';
import styles from './postFormFiled.module.scss';
import Button from '../../common/button/Button';

export default function PostFormField() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <>
      <div className={styles.fields}>
        <div className={styles.row}>
          <InputField control={control} name="title" label="제목" />
        </div>
        <div className={styles.row}>
          <InputField control={control} name="summary" label="부제목" />
        </div>
        <div className={styles.row}>
          <InputField
            control={control}
            name="recruitmentTarget"
            label="모집대상"
          />
          <InputField
            control={control}
            name="recruitmentNum"
            label="모집인원"
          />
        </div>
        <div className={styles.row}>
          <InputField
            control={control}
            name="recruitmentDeadline"
            label="모집기한"
          />
        </div>
        <div className={styles.row}>
          <InputField
            control={control}
            name="activityStart"
            label="활동시작일"
          />
          <InputField
            control={control}
            name="activityFinish"
            label="활동종료일"
          />
        </div>
        <div className={styles.row}>
          <InputField control={control} name="activityCycle" label="활동주기" />
        </div>
        <div className={styles.row}>
          <InputField control={control} name="content" label="세부내용" />
        </div>
      </div>
    </>
  );
}
