import styles from './recruitmentBoardContent.module.scss';

export interface Props {
  name: string,
  categories: string[],
  target: string,
  recruitmentNum: string,
  recruitmentStart: string,
  recruitmentDeadline: string,
  activity: string,
  activityStart: string,
  activityFinish: string,
  detail: string,
}
// TODO: 백엔드 api 완성되면 수정
export default function RecruitmentBoardContent({name, categories, target, recruitmentNum, recruitmentStart, recruitmentDeadline, activity, activityStart, activityFinish, detail}: Props) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.infoTable}>
        <tbody>
        <tr>
          <th>주최자</th>
          <td>{name}</td>
        </tr>
        <tr>
          <th>카테고리</th>
          <td>{categories.reduce((i, value) => i + `${value} `, '')}</td>
        </tr>
        <tr>
          <th>신청대상</th>
          <td>{target}</td>
        </tr>
        <tr>
          <th>모집인원</th>
          <td>{recruitmentNum}명</td>
        </tr>
        <tr>
          <th>모집기한</th>
          <td>{`${recruitmentStart} - ${recruitmentDeadline}`}</td>
        </tr>
        <tr>
          <th>활동방식</th>
          <td>{activity}</td>
        </tr>
        <tr>
          <th>활동기간</th>
          <td>{`${activityStart} - ${activityFinish}`}</td>
        </tr>
        <tr>
          <th>세부내용</th>
          <td>{detail}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}