import styles from './recruitmentBoardContent.module.scss';

export interface Props {
  target: string;
  recruitmentNum: number;
  recruitmentStart: string;
  recruitmentDeadline: string;
  activity: string;
  activityStart: string;
  activityFinish: string;
  detail: string;
  buttonBlock: JSX.Element;
}

export default function RecruitmentBoardContent({
  target,
  recruitmentNum,
  recruitmentStart,
  recruitmentDeadline,
  activity,
  activityStart,
  activityFinish,
  buttonBlock,
  detail,
}: Props) {
  return (
    <div className={styles.tableContainer}>
      <section className={styles.section}>
        <span className={styles.header}>모집요강</span>
        <div className={styles.infoTable}>
          <div className={styles.item}>
            <span className={styles.label}>모집기한</span>
            <span
              className={styles.body}
            >{`${recruitmentStart} - ${recruitmentDeadline}`}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>활동기간</span>
            <span
              className={styles.body}
            >{`${activityStart} - ${activityFinish}`}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>모집대상</span>
            <span className={styles.body}>{target}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>활동방식</span>
            <span className={styles.body}>{activity}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>모집인원</span>
            <span className={styles.body}>{recruitmentNum}명</span>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <span className={styles.header}>세부내용</span>
        <div className={styles.detail}>
          <pre>{detail}</pre>
        </div>
      </section>
      {buttonBlock}
    </div>
  );
}
