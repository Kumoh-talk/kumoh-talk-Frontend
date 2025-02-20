import { ApplicantDetailApi } from '@/app/lib/types/recruitmentBoards/applicantDetail';
import styles from './listDetailTable.module.scss';

export interface Props {
  applicantDetail: ApplicantDetailApi;
}

export default function ListDetailTable({ applicantDetail }: Props) {
  const { applicantId, applicantAnswer } = applicantDetail.data;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.infoTable}>
        <tbody>
          {applicantAnswer.map((answerField) => (
            <tr key={answerField.questionId}>
              <th>{answerField.question}</th>
              <td>
                {answerField.answerList.map((answer, index) => (
                  <>
                    <span key={answer.answerId}>{answer.answer}</span>
                    {index !== answerField.answerList.length - 1 && <br />}
                  </>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
