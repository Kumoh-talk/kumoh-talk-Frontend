'use client';

import { useContext, useRef } from 'react';
import { Plus } from 'lucide-react';
import styles from './createPostForm.module.scss';
import QuestionInputField from './QuestionInputField';
import { PostContext } from './PostProvider';

export default function CreatePostForm() {
  const { form, setForm } = useContext(PostContext);
  const questionRef = useRef(1);

  const addQuestion = () => {
    setForm([
      ...form,
      {
        number: ++questionRef.current,
        question: '',
        type: 'description',
        isEssential: false,
        answerList: [],
      },
    ]);
  };

  const deleteQuestion = (number: number) => {
    setForm(form.filter((question) => question.number !== number));
  };

  return (
    <div className={styles.createPostForm}>
      {form.map((question) => (
        <QuestionInputField
          question={question}
          deleteQuestion={deleteQuestion}
          key={question.number}
        />
      ))}
      <div className={styles.addButton} onClick={addQuestion}>
        <Plus className={styles.icon} color='white' size={20} />
      </div>
    </div>
  );
}
