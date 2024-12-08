import { FormFieldNameContext } from '@/app/lib/contexts/FormContext';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldNameContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldNameContext.Provider>
  );
};

export default FormField;
