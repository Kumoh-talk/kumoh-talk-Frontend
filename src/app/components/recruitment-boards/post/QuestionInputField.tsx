'use client';

import Select from '../../apply/Select/Select';
import styles from './questionInputField.module.scss';
import { Trash } from 'lucide-react';

type AnswerType = {
  number: number;
  answer: string;
};

export type QuestionType = {
  number: number;
  question: string;
  type: 'description' | 'choice' | 'checkbox';
  isEssential: boolean;
  answerList: AnswerType[];
};

export interface Props {
  question: QuestionType;
  questionArr: QuestionType[];
  setQuestionArr: (questionArr: QuestionType[]) => void;
}

const options = [
  {
    value: 'description',
    label: '주관형',
  },
  {
    value: 'choice',
    label: '객관형',
  },
  {
    value: 'checkbox',
    label: '체크박스',
  },
];

export default function QuestionInputField({
  question,
  questionArr,
  setQuestionArr,
}: Props) {
  return (
    <div className={styles.questionInputField}>
      <div className={styles.leftWall} />
      <div className={styles.field}>
        <div className={styles.title}>
          <input
            className={styles.input}
            value={question.question}
            onChange={(e) => {
              const newQuestionArr = questionArr.map((q) =>
                q.number === question.number
                  ? { ...q, question: e.target.value }
                  : q
              );
              setQuestionArr(newQuestionArr);
            }}
            placeholder='질문 제목을 입력하세요'
          />
          <div className={styles.select}>
            <Select options={options} onChange={() => {}} />
          </div>
        </div>
        <div className={styles.questionBottom}>
          <div>
            <Trash color='#959595' size={16} />
          </div>
          <div>필수</div>
        </div>
      </div>
    </div>
  );
}
