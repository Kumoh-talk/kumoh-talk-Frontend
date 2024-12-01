import AlarmSvg from '@/app/assets/svg/AlarmSvg';
import styles from './alert.module.scss';

export default function Alert() {
  return (
    <button className={styles.alert}>
      <AlarmSvg />
    </button>
  );
}
