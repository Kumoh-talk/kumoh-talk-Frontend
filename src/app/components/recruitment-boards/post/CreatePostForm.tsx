'use client';

import { useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import styles from './createPostForm.module.scss';
import QuestionInputField, { QuestionType } from './QuestionInputField';

export default function CreatePostForm() {
  const [questionArr, setQuestionArr] = useState<QuestionType[]>([
    {
      number: 1,
      question: '',
      type: 'description',
      isEssential: false,
      answerList: [],
    },
  ]);
  const questionRef = useRef(1);

  const addQuestion = () => {
    setQuestionArr([
      ...questionArr,
      {
        number: ++questionRef.current,
        question: '',
        type: 'description',
        isEssential: false,
        answerList: [],
      },
    ]);
  };

  return (
    <div className={styles.createPostForm}>
      {questionArr.map((question) => (
        <QuestionInputField
          question={question}
          questionArr={questionArr}
          setQuestionArr={setQuestionArr}
          key={question.number}
        />
      ))}
      <div className={styles.addButton} onClick={addQuestion}>
        <Plus className={styles.icon} color='white' size={20} />
      </div>
    </div>
  );
}
