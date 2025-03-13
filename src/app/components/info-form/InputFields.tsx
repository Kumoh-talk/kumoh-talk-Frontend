'use client';

import Image from 'next/image';
import togetherHeader from '@/app/assets/png/togetherHeader.png';
import InputField from '../apply/Field/InputField';
import SelectField from '../apply/Field/SelectField';
import { useFormContext } from 'react-hook-form';

import styles from './inputForm.module.scss';
import { departments, grades } from '@/app/lib/constants/apply/selectValues';
import Button from '../common/button/Button';
export default function InputFields() {
  const form = useFormContext();

  return (
    <>
      <Image
        src={togetherHeader}
        alt="헤더 이미지"
        className={styles.headerImg}
      />
      <div className={styles.wrapper}>
        <h2>인적사항</h2>
        <div className={styles.gradeWrapper}>
          <SelectField
            control={form.control}
            name="studentStatus"
            label="재학상태"
            options={[
              { value: '재학', label: '재학중' },
              { value: '휴학', label: '휴학중' },
              { value: '졸업', label: '졸업함' },
            ]}
          />
          <SelectField
            control={form.control}
            name="grade"
            label="학년"
            options={grades}
          />
        </div>
        <div className={styles.gradeWrapper}>
          <SelectField
            control={form.control}
            name="department"
            label="학과"
            options={departments}
          />
          <InputField control={form.control} name="studentId" label="학번" />
        </div>
        <InputField control={form.control} name="email" label="이메일 주소" />
        <InputField
          control={form.control}
          name="phoneNumber"
          label="전화번호"
        />
        <Button
          type="submit"
          size="full"
          className={styles.submit}
          disabled={form.formState.isSubmitting}
        >
          저장하기
        </Button>
      </div>
    </>
  );
}
