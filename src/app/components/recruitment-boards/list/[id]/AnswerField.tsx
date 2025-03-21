import { Answer } from '@/app/lib/types/recruitmentBoards/applicantDetail';
import styles from './answerField.module.scss';
import { ClipboardList } from 'lucide-react';

export interface Props {
  question: string;
  answerList: Answer[];
}

export default function AnswerField({ question, answerList }: Props) {
  return (
    <div className={styles.applicationWrapper}>
      <div className={styles.question}>
        <ClipboardList color="#007aff" />
        {question}
      </div>
      <div className={styles.answerWrapper}>
        {answerList.map((answer, index) => (
          <span className={styles.answer} key={answer.answerId}>
            {answer.answer}
            {index !== answerList.length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  );
}
