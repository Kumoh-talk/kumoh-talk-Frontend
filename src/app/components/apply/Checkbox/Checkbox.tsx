import React from 'react';
import CheckSvg from '@/app/assets/svg/CheckSvg';
import styles from './Checkbox.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

const Checkbox = ({ children, ...props }: CheckboxProps) => {
  return (
    <label className={styles.container}>
      <input type='checkbox' className={styles.checkbox} {...props} />
      <div className={styles.iconWrapper}>
        <CheckSvg/>
      </div>
      <span>{children}</span>
    </label>
  );
};

export default Checkbox;
