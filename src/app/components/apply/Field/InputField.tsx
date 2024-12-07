import Input from '../Input/Input';
import FormField from '../Form/FormField';
import FormItem from '../Form/FormItem';
import FormLabel from '../Form/FormLabel';
import FormMessage from '../Form/FormMessage';
import type { Control, FieldValues } from 'react-hook-form';

interface InputFieldProps {
  control: Control<FieldValues, any>;
  name: string;
  label: string;
  placeholder?: string;
}

const InputField = ({
  control,
  name,
  label,
  placeholder = '필수 입력 칸 입니다.',
}: InputFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Input {...field} placeholder={placeholder} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
