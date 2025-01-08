import ActivityIcon from '@/app/assets/svg/ActivityIcon';
import styles from './profileSideBar.module.scss';
import SubList from './SubList';

export default function MyActivity() {
  return (
    <>
      <div className={styles.row}>
        <ActivityIcon />
        <p>내 활동</p>
      </div>
      <SubList />
    </>
  );
}
