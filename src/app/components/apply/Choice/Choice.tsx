import React from 'react';
import CheckSvg from '@/app/assets/svg/CheckSvg';
import styles from './Choice.module.scss';

interface ChoiceProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

const Checkbox = ({ children, ...props }: ChoiceProps) => {
  return (
    <label className={styles.container}>
      <input type="radio" className={styles.choice} {...props} />
      <div className={styles.iconWrapper}>
        <CheckSvg />
      </div>
      <span>{children}</span>
    </label>
  );
};

export default Checkbox;
