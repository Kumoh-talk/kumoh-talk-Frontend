import MaleUser from '@/app/assets/svg/MaleUser';
import styles from './profileSideBar.module.scss';
import Link from 'next/link';

export default function MyProfile() {
  return (
    <div className={styles.row}>
      <MaleUser />
      <Link href="/profile">내 프로필</Link>
    </div>
  );
}
