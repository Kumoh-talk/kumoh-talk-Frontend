import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormFieldNameContext,
  FormFieldIdContext,
} from '../../contexts/FormContext';

const useFormField = () => {
  const fieldNameContext = useContext(FormFieldNameContext);
  const fieldIdContext = useContext(FormFieldIdContext);

  const { formState, getFieldState } = useFormContext();

  const fieldState = getFieldState(fieldNameContext.name, formState);

  if (!fieldNameContext) throw new Error('Need FieldNameContext');
  if (!fieldIdContext) throw new Error('Need FieldIdContext');

  const { id } = fieldIdContext;

  return {
    id,
    name: fieldNameContext.name,
    formItemId: `Item-${id}`,
    formMessageId: `Message-${id}`,
    ...fieldState,
  };
};

export { useFormField };
