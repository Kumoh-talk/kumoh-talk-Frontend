import SideBarArrow from '@/app/assets/svg/SideBarArrow';
import styles from './profileSideBar.module.scss';

export default function SubList() {
  return (
    <div className={styles.subList}>
      <div className={styles.subRow}>
        <SideBarArrow />
        <span>신청내역</span>
      </div>
      <div className={styles.subRow}>
        <SideBarArrow />
        <span>작성글</span>
      </div>
      <div className={styles.subRow}>
        <SideBarArrow />
        <span>작성댓글</span>
      </div>
    </div>
  );
}
