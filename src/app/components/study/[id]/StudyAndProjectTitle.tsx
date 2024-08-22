import styles from './studyAndProjectTitle.module.scss';
import HashTag from "@/app/components/study/[id]/HashTag";

export function StudyAndProjectTitle() {
  return (
    <div className={styles.titleBlock}>
      <div className={styles.title}>제목</div>
      <div className={styles.tags}>
        <HashTag />
        <HashTag />
        <HashTag />
      </div>
    </div>
  )
}