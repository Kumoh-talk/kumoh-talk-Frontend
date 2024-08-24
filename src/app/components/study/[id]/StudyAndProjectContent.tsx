import styles from './studyAndProjectContent.module.scss';
// TODO: 백엔드 api 완성되면 수정
export default function StudyAndProjectContent() {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.infoTable}>
        <tbody>
        <tr>
          <th>주최자</th>
          <td>황준호</td>
        </tr>
        <tr>
          <th>카테고리</th>
          <td>스터디 프론트 모바일</td>
        </tr>
        <tr>
          <th>신청대상</th>
          <td>컴퓨터공학과</td>
        </tr>
        <tr>
          <th>모집인원</th>
          <td>10명</td>
        </tr>
        <tr>
          <th>모집기한</th>
          <td>2024.07.01 12:00</td>
        </tr>
        <tr>
          <th>활동방식</th>
          <td>주 2회 화요일(대면), 수요일(비대면)</td>
        </tr>
        <tr>
          <th>활동기간</th>
          <td>2024.07.01 12:00 - 2024.07.08 24:00</td>
        </tr>
        <tr>
          <th>세부내용</th>
          <td>해결하는 방법을 배워서 학점을 고칠예정</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}