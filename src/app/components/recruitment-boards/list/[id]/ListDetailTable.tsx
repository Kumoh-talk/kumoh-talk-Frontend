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
          {applicantAnswer.map((answer) => (
            <tr key={answer.questionId}>
              <th>{answer.question}</th>
              <td>{answer.answerList.join('\n')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
