import { Control } from 'react-hook-form';
import InputField from '../../apply/Field/InputField';
import CheckboxField from '../post/Field/CheckboxField';
import ChoiceField from '../post/Field/ChoiceField';
import { Questions } from '@/app/lib/types/recruitmentBoards/apply/apply';

export default function ParseTypeToField({
  control,
  question,
}: {
  control: Control;
  question: Questions;
}) {
  switch (question.type) {
    case 'DESCRIPTION':
      return (
        <InputField
          control={control}
          name={`${question.questionId}`}
          label={`${question.question}`}
          placeholder={
            question.isEssential
              ? '필수 입력 칸 입니다.'
              : '선택 입력 칸 입니다.'
          }
          required={question.isEssential}
        />
      );
    case 'CHOICE':
      return (
        <ChoiceField
          control={control}
          name={`${question.questionId}`}
          values={question.answerList}
          label={`${question.question}`}
          required={question.isEssential}
        />
      );
    case 'CHECKBOX':
      return (
        <CheckboxField
          control={control}
          name={`${question.questionId}`}
          values={question.answerList}
          label={`${question.question}`}
          required={question.isEssential}
        />
      );
    default:
      return <div>error</div>;
  }
}
