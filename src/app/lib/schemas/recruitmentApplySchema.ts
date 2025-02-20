import { z } from 'zod';
import { Questions } from '../types/recruitmentBoards/apply/apply';

const ERROR_MSG = {
  required: '필수 입력 항목입니다.',
};

export const recruitmentApplySchema = (questions: Questions[]) => {
  const schema = z.object(
    Object.fromEntries(
      questions.map((question) => {
        const key = `${question.questionId}`;
        switch (question.type) {
          case 'DESCRIPTION':
            return [
              key,
              question.isEssential
                ? z.string().min(1, ERROR_MSG.required)
                : z.string(),
            ];
          case 'CHOICE':
            return [
              key,
              question.isEssential
                ? z
                    .array(z.object({ number: z.number() }))
                    .nonempty(ERROR_MSG.required)
                : z.any(),
            ];
          case 'CHECKBOX':
            return [
              key,
              question.isEssential
                ? z
                    .array(z.object({ number: z.number() }))
                    .nonempty(ERROR_MSG.required)
                : z.any(),
            ];
        }
      })
    )
  );

  return schema;
};
