import { Control } from 'react-hook-form';
import FormField from '../../../apply/Form/FormField';
import FormLabel from '../../../apply/Form/FormLabel';
import FormItem from '../../../apply/Form/FormItem';
import FormMessage from '../../../apply/Form/FormMessage';
import Checkbox from '../../../apply/Checkbox/Checkbox';

type Props = {
  control: Control;
  name: string;
  values: { answerId: number; number: number; answer: string }[];
  label: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function CheckboxField({
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
        // field.value가 배열이 아닐 수 있으므로 초기값 처리
        const selectedValues = Array.isArray(field.value) ? field.value : [];
        return (
          <FormItem>
            <FormLabel>
              {label}{' '}
              {required && (
                <span aria-label='required' style={{ color: '#ff7f00' }}>
                  *
                </span>
              )}
            </FormLabel>
            {values.map((value) => (
              <Checkbox
                key={value.answerId}
                // 현재 선택된 값에 포함되어 있는지 여부로 checked 설정
                checked={selectedValues.some(
                  (selected) => selected.number === value.number
                )}
                onChange={(e) => {
                  if (e.target.checked) {
                    // 체크가 되면 기존 배열에 추가
                    field.onChange([
                      ...selectedValues,
                      { number: value.number },
                    ]);
                  } else {
                    // 체크 해제하면 배열에서 제거
                    field.onChange(
                      selectedValues.filter(
                        ({ number }) => number !== value.number
                      )
                    );
                  }
                  console.log(field.value);
                }}
              >
                {value.answer}
              </Checkbox>
            ))}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
