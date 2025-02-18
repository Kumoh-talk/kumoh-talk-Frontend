'use client';

import { useFormContext } from 'react-hook-form';
import styles from './recruitmentApplyFormField.module.scss';
import Button from '../../common/button/Button';
import { Questions } from '@/app/lib/types/recruitmentBoards/apply/apply';
import ParseTypeToField from './ParseTypeToField';

export interface Props {
  questions: Questions[];
}

export default function RecruitmentApplyFormField({ questions }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <>
      <div className={styles.field}>
        {questions.map((question) => (
          <div key={question.questionId} className={styles.row}>
            <ParseTypeToField control={control} question={question} />
          </div>
        ))}
        <div className={styles.row}>
          <Button type="submit" size="large">
            지원하기
          </Button>
        </div>
      </div>
    </>
  );
}
