'use client';

import { useContext, useRef, useState } from 'react';
import { PostContext } from './PostProvider';
import styles from './answerOptions.module.scss';
import { PostForm } from '@/app/lib/types/recruitmentBoards/post/postForm';
import ChoiceButton from '@/app/assets/svg/ChoiceButton';
import CheckboxButton from '@/app/assets/svg/CheckboxButton';
import { X } from 'lucide-react';

export interface Props {
  question: PostForm;
}

export default function AnswerOptions({ question }: Props) {
  const { form, setForm } = useContext(PostContext);
  const [input, setInput] = useState<string>('');
  const answerRef = useRef(1);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onkeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addAnswer();
    }
  };

  const addAnswer = () => {
    if (input === '') return;

    const newAnswerArr = {
      number: answerRef.current++,
      answer: input,
    };
    const newAnswerList = [...question.answerList, newAnswerArr];
    const newQuestionArr = form.map((q) =>
      q.number === question.number ? { ...q, answerList: newAnswerList } : q
    );
    setForm(newQuestionArr);
    setInput('');
  };

  const deleteAnswer = (number: number) => {
    const newAnswerList = question.answerList.filter(
      (answer) => answer.number !== number
    );
    const newQuestionArr = form.map((q) =>
      q.number === question.number ? { ...q, answerList: newAnswerList } : q
    );
    setForm(newQuestionArr);
  };

  return (
    <div className={styles.optionList}>
      {question.answerList.map((answer) => (
        <div className={styles.optionRow} key={answer.number}>
          {question.type === 'choice' ? <ChoiceButton /> : <CheckboxButton />}
          <p>{answer.answer}</p>
          <X
            className={styles.deleteButton}
            size={12}
            color='red'
            onClick={() => deleteAnswer(answer.number)}
          />
        </div>
      ))}
      <div className={styles.optionRow}>
        {question.type === 'choice' ? <ChoiceButton /> : <CheckboxButton />}
        <input
          placeholder='텍스트를 입력하세요.'
          value={input}
          onChange={onChangeInput}
          onKeyDown={onkeydown}
          maxLength={50}
        />
        <p className={styles.addButton} onClick={addAnswer}>
          추가
        </p>
      </div>
    </div>
  );
}
