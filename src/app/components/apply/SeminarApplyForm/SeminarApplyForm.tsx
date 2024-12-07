'use client';

import { useFormState } from 'react-dom';
import submitAction from '@/app/lib/apis/apply/submitAction';
import FormFields from '../FormFields/FormFields';
import styles from './SeminarApplyForm.module.scss';

const SeminarApplyForm = () => {
  const [formState, formAction] = useFormState(submitAction, null);

  return (
    <form className={styles.seminarApplyForm} action={formAction}>
      <FormFields />
    </form>
  );
};

export default SeminarApplyForm;
