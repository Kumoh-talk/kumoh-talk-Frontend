import styles from './listTitle.module.scss';

export default function ListTitle() {
  return (
    <div className={styles.titleBlock}>
      <p className={styles.name}>이름</p>
      <p>학과</p>
      <p>학년</p>
      <p>학번</p>
      <p>전화번호</p>
      <p>재학상태</p>
    </div>
  )
}