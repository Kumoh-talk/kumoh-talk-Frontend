'use client';

import FormFields from '../FormFields/FormFields';
import styles from './SeminarApplyForm.module.scss';

const SeminarApplyForm = () => {
  return (
    <form className={styles.seminarApplyForm}>
      <FormFields />
    </form>
  );
};

export default SeminarApplyForm;
