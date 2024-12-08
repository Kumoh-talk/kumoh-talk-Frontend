import { forwardRef } from 'react';
import { useFormField } from '@/app/lib/hooks/apply/useFormField';
import { HTMLAttributes } from 'react';
import styles from './Form.module.scss';

const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { error, formMessageId } = useFormField();

  if (!error) return null;

  const message = error.message;

  return (
    <p className={styles.formMessage} ref={ref} id={formMessageId} {...props}>
      {message}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

export default FormMessage;
