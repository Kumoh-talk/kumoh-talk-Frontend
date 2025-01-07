'use client';

import {
  selectType,
  PostForm,
} from '@/app/lib/types/recruitmentBoards/post/postForm';
import Select from '../../apply/Select/Select';
import Switch from '../../common/Switch/Switch';
import styles from './questionInputField.module.scss';
import { Trash } from 'lucide-react';
import { formOptions } from '@/app/lib/constants/recruitmentBoards/post/formOptions';
import { useContext } from 'react';
import { PostContext } from './PostProvider';

export interface Props {
  question: PostForm;
  deleteQuestion: (number: number) => void;
}

export default function QuestionInputField({
  question,
  deleteQuestion,
}: Props) {
  const { form, setForm } = useContext(PostContext);

  const onSelectChange = (value: string) => {
    const selectType = value as selectType;
    const newQuestionArr = form.map((q) =>
      q.number === question.number ? { ...q, type: selectType } : q
    );
    setForm([...newQuestionArr]);
  };

  const essentialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestionArr = form.map((q) =>
      q.number === question.number
        ? { ...q, isEssential: event.target.checked }
        : q
    );
    setForm(newQuestionArr);
  };

  return (
    <div className={styles.questionInputField}>
      <div className={styles.leftWall} />
      <div className={styles.field}>
        <div className={styles.title}>
          <input
            className={styles.input}
            value={question.question}
            onChange={(e) => {
              const newQuestionArr = form.map((q) =>
                q.number === question.number
                  ? { ...q, question: e.target.value }
                  : q
              );
              setForm(newQuestionArr);
            }}
            placeholder='질문 제목을 입력하세요'
          />
          <div className={styles.select}>
            <Select options={formOptions} onChange={onSelectChange} />
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
            <Switch checked={question.isEssential} onChange={essentialChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
