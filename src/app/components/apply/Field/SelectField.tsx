import FormField from '../Form/FormField';
import FormItem from '../Form/FormItem';
import FormLabel from '../Form/FormLabel';
import FormMessage from '../Form/FormMessage';
import Select from '../Select/Select';
import type { Control, FieldValues } from 'react-hook-form';

interface SelectFieldProps {
  control: Control<FieldValues, any>;
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

const SelectField = ({ control, name, label, options }: SelectFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select options={options} onChange={field.onChange} />
          <input type='hidden' name={field.name} value={field.value} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
