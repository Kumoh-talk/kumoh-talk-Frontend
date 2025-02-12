'use client';

import { useFormContext } from 'react-hook-form';
import InputField from '../../apply/Field/InputField';
import styles from './recruitmentApplyFormField.module.scss';
import Button from '../../common/button/Button';

export default function RecruitmentApplyFormField() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <>
      <div className={styles.field}>
        <div className={styles.row}>
          <InputField control={control} name="name" label="이름" />
          <InputField control={control} name="email" label="학과" />
        </div>
        <div className={styles.row}>
          <InputField control={control} name="phone" label="학년" />
          <InputField control={control} name="github" label="학번" />
        </div>
        <div className={styles.row}>
          <InputField control={control} name="portfolio" label="재학상태" />
        </div>
        <div className={styles.row}>
          <InputField control={control} name="phoneNumber" label="전화번호" />
        </div>
        <div className={styles.row}>
          <InputField control={control} name="message" label="지원동기" />
        </div>
        <div className={styles.row}>
          <Button type="submit" size="large">
            지원하기
          </Button>
        </div>
      </div>
    </>
  );
}
