import { useContext } from "react";
import styles from "./educationInfo.module.scss";
import { userInfoContext } from "./UserInfoProvider";

export default function EducationInfo() {
  // TODO: 학사 정보에 넣을만한 내용이 api에 없음
  const { data } = useContext(userInfoContext);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.title}>
            <span>재적상태</span>
          </div>
          <div className={styles.content}>
            <span>{data.role}</span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <span>학번/학년</span>
          </div>
          <div className={styles.content}>
            <span>20201234/1학년</span>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.title}>
            <span>학과</span>
          </div>
          <div className={styles.content}>
            <span>컴퓨터공학과</span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <span>전화번호</span>
          </div>
          <div className={styles.content}>
            <span>010-1234-5678</span>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.lastTitle}>
          <span>이메일</span>
        </div>
        <div className={styles.lastContent}>
          <span>asd123@kumoh.ac.kr</span>
        </div>
      </div>
    </div>
  );
}
