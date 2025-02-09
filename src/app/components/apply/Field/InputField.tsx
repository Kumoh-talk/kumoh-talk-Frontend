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

interface InputFieldProps {
  control: Control<FieldValues, any>;
  name: string;
  label: string;
  type?: 'text' | 'phone' | 'number' | 'date' | 'datetime-local';
  placeholder?: string;
}

const InputField = ({
  control,
  name,
  label,
  type = 'text',
  placeholder = '필수 입력 칸 입니다.',
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
          <FormLabel>{label}</FormLabel>
          <Input
            {...field}
            placeholder={placeholder}
            onChange={(e) => handleInput(e, field)}
            type={type}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
