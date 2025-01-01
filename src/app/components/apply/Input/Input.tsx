import { forwardRef, InputHTMLAttributes } from 'react';
import { useFormField } from '@/app/lib/hooks/apply/useFormField';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  const { formItemId } = useFormField();

  return (
    <input
      className={styles.input}
      ref={ref}
      id={formItemId}
      placeholder='필수 입력 칸입니다'
      {...props}
    />
  );
});
Input.displayName = 'SeminarFormInput';

export default Input;
