import { Control } from 'react-hook-form';
import FormField from '../Form/FormField';
import FormLabel from '../Form/FormLabel';
import FormItem from '../Form/FormItem';
import FormMessage from '../Form/FormMessage';
import Choice from '../Choice/Choice';

type Props = {
  control: Control;
  name: string;
  values: { answerId: number; number: number; answer: string }[];
  label: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function ChoiceField({
  control,
  name,
  values,
  label,
  required = false,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>
              {label}{' '}
              {required && (
                <span aria-label="required" style={{ color: '#ff7f00' }}>
                  *
                </span>
              )}
            </FormLabel>
            {values.map((value) => (
              <Choice
                key={value.answerId}
                {...field}
                onChange={(e) => {
                  field.onChange([
                    {
                      number: value.number,
                    },
                  ]);
                  console.log(field.value);
                }}
              >
                {value.answer}
              </Choice>
            ))}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
