import FormField from '../Form/FormField';
import FormItem from '../Form/FormItem';
import FormLabel from '../Form/FormLabel';
import FormMessage from '../Form/FormMessage';
import type {
  Control,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form';
import Textarea from '../../common/textarea/Textarea';

type TextareaFieldProps = {
  control: Control<FieldValues, any>;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaField = ({
  control,
  name,
  label,
  placeholder = '필수 입력 칸 입니다.',
  required = false,
}: TextareaFieldProps) => {
  const handleInput = (
    e: React.FormEvent<HTMLTextAreaElement>,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    const target = e.currentTarget;

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
          <Textarea
            {...field}
            placeholder={placeholder}
            onChange={(e) => handleInput(e, field)}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextareaField;
