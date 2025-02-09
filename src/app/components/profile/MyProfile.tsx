import MaleUser from '@/app/assets/svg/MaleUser';
import styles from './profileSideBar.module.scss';

export default function MyProfile() {
  return (
    <div className={styles.row}>
      <MaleUser />
      <p>내 프로필</p>
    </div>
  );
}
