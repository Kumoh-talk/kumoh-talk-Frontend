import ProfileSideBar from '../components/profile/ProfileSideBar';
import styles from './page.module.scss';
import ProfileContent from '../components/profile/ProfileContent';

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.sideBar}>
        <div />
        <ProfileSideBar />
      </div>
      <div className={styles.content}>
        <ProfileContent />
      </div>
    </div>
  );
}
