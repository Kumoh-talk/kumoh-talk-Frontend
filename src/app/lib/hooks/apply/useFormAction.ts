'use client';

import { useEffect, useCallback } from 'react';
import { FormState } from '@/app/lib/types/apply/formState';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';

type UseFormActionProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> = UseFormProps<TFieldValues, TContext> & {
  formState: FormState | null;
  onSuccess?: () => void;
};

export function useFormAction<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>({
  formState,
  onSuccess: onSuccessFn,
  ...props
}: UseFormActionProps<TFieldValues, TContext>) {
  const form = useForm({ ...props });

  const onSuccess = useCallback(() => {
    onSuccessFn?.();
  }, []);

  useEffect(() => {
    if (!formState || !hasState(formState)) return;

    form.clearErrors();

    switch (formState.code) {
      case 'VALIDATION_ERROR':
        const { fieldErrors } = formState;

        Object.keys(fieldErrors).forEach((key) => {
          form.setError(key as any, {
            message: fieldErrors[key].flat()[0],
          });
        });
        break;
      case 'SUCCESS':
        onSuccess();
        form.reset();
        break;
    }
  }, [formState]);

  return { ...form };
}

const hasState = (formState: FormState | null): formState is FormState => {
  if (!formState || typeof formState !== 'object') return false;

  return 'code' in formState;
};
