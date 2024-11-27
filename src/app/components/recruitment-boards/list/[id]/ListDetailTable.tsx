import styles from './listDetailTable.module.scss';

export default function ListDetailTable() {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.infoTable}>
        <tbody>
        <tr>
          <th>이름</th>
          <td>황용진</td>
        </tr>
        <tr>
          <th>학과</th>
          <td>컴퓨터공학과</td>
        </tr>
        <tr>
          <th>학년</th>
          <td>2학년</td>
        </tr>
        <tr>
          <th>학번</th>
          <td>20201287</td>
        </tr>
        <tr>
          <th>전화번호</th>
          <td>010 1234 5678</td>
        </tr>
        <tr>
          <th>재학상태</th>
          <td>재학생</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}