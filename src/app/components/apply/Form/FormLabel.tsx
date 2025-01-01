import { forwardRef } from 'react';
import { LabelHTMLAttributes } from 'react';
import { useFormField } from '@/app/lib/hooks/apply/useFormField';
import Label from '../Label/Label';

const FormLabel = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();

  return <Label ref={ref} htmlFor={formItemId} {...props} />;
});
FormLabel.displayName = 'FormLabel';

export default FormLabel;
