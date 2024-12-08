import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return (
    <input
      className={styles.input}
      ref={ref}
      placeholder='필수 입력 칸입니다'
      {...props}
    />
  );
});
Input.displayName = 'SeminarFormInput';

export default Input;
