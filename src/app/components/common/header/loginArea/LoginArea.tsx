import LoginButton from './loginButton/LoginButton';
import styles from './loginArea.module.scss';

export default function LoginArea() {
  return (
    <div className={styles.loginArea}>
      <LoginButton />
    </div>
  );
}
