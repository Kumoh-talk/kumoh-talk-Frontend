import { Control, Controller, FieldValues } from 'react-hook-form';
import Checkbox from '../Checkbox/Checkbox';
import FormField from '../Form/FormField';
import FormItem from '../Form/FormItem';
import FormMessage from '../Form/FormMessage';

interface CheckboxFieldProps {
  control: Control<FieldValues, any>;
  name: string;
  label: string;
}

const CheckboxField = ({ control, name, label }: CheckboxFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value}>
                {label}
              </Checkbox>
            )}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckboxField;
