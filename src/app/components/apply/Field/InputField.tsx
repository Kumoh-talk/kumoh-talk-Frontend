import { formatPhoneNumber, formatNumber } from '@/app/lib/utils/formatters';
import Input from '../Input/Input';
import FormField from '../Form/FormField';
import FormItem from '../Form/FormItem';
import FormLabel from '../Form/FormLabel';
import FormMessage from '../Form/FormMessage';
import type {
  Control,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form';

type InputFieldProps = {
  control: Control<FieldValues, any>;
  name: string;
  label: string;
  type?: 'text' | 'phone' | 'number' | 'date' | 'datetime-local';
  placeholder?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = ({
  control,
  name,
  label,
  type = 'text',
  placeholder = '필수 입력 칸 입니다.',
  required = false,
}: InputFieldProps) => {
  const handleInput = (
    e: React.FormEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    const target = e.currentTarget;

    if (type === 'phone') {
      target.value = formatPhoneNumber(target.value);
      field.onChange(target.value);
      return;
    }

    if (type === 'number') {
      target.value = formatNumber(target.value);
      field.onChange(target.value === '' ? 0 : Number(target.value));
      return;
    }

    field.onChange(target.value);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} &nbsp;{' '}
            {required && (
              <span aria-label='required' style={{ color: '#ff7f00' }}>
                *
              </span>
            )}
          </FormLabel>
          <Input
            {...field}
            placeholder={placeholder}
            onChange={(e) => handleInput(e, field)}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            type={type}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
