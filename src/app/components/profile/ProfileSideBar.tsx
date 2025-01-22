import MyProfile from './MyProfile';
import MyActivity from './MyActivity';
import styles from './profileSideBar.module.scss';

export default function ProfileSideBar() {
  return (
    <div className={styles.bar}>
      <MyProfile />
      <MyActivity />
    </div>
  );
}
