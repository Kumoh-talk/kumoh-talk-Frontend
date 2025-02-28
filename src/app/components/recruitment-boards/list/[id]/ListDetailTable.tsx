import { ApplicantDetailApi } from '@/app/lib/types/recruitmentBoards/applicantDetail';
import styles from './listDetailTable.module.scss';
import AnswerField from './AnswerField';

export interface Props {
  applicantDetail: ApplicantDetailApi;
}

export default function ListDetailTable({ applicantDetail }: Props) {
  const { applicantId, applicantAnswer } = applicantDetail.data;

  return (
    <div className={styles.infoTable}>
      {applicantAnswer.map((answerField) => (
        <AnswerField
          key={answerField.question}
          question={answerField.question}
          answerList={answerField.answerList}
        />
      ))}
    </div>
  );
}
