import { forwardRef, TextareaHTMLAttributes } from 'react';
import { useFormField } from '@/app/lib/hooks/apply/useFormField';
import styles from './textarea.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ ...props }, ref) => {
    const { formItemId } = useFormField();

    return (
      <textarea
        className={styles.textarea}
        ref={ref}
        id={formItemId}
        placeholder='필수 입력 칸입니다'
        {...props}
      />
    );
  }
);
Textarea.displayName = 'SeminarFormTextarea';

export default Textarea;
