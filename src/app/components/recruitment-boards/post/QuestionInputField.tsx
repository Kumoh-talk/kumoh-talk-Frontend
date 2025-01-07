'use client';

import { PostForm } from '@/app/lib/types/recruitmentBoards/post/postForm';
import Select from '../../apply/Select/Select';
import Switch from '../../common/Switch/Switch';
import styles from './questionInputField.module.scss';
import { Trash } from 'lucide-react';

export interface Props {
  question: PostForm;
  questionArr: PostForm[];
  setQuestionArr: (questionArr: PostForm[]) => void;
  deleteQuestion: (number: number) => void;
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
  deleteQuestion,
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
          <div
            className={styles.deleteButton}
            onClick={() => deleteQuestion(question.number)}
          >
            <Trash color='#959595' size={16} />
          </div>
          <div className={styles.requiredSwitch}>
            <p>필수</p>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
}
