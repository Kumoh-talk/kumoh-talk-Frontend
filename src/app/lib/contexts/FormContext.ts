import { createContext } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';

type FormFieldNameContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldNameContext = createContext<FormFieldNameContextValue>(
  {} as FormFieldNameContextValue
);

type FormFieldIdContextValue = {
  id: string;
};

const FormFieldIdContext = createContext<FormFieldIdContextValue>(
  {} as FormFieldIdContextValue
);

export { FormFieldNameContext, FormFieldIdContext };
