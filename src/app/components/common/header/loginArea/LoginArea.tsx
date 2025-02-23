import LoginButton from './loginButton/LoginButton';
import LogoutButton from './logoutButton/LogoutButton';
import styles from './loginArea.module.scss';
import { cookies } from 'next/headers';
import WelcomeBubble from './welcomeBubble/WelcomeBubble';
import { parseJwt } from '@/app/lib/apis/auth';
import Link from 'next/link';

export default async function LoginArea() {
  const accessToken = cookies().get('accessToken')?.value;

  // 로그아웃 상태
  if (!accessToken) {
    return (
      <div className={styles.loginArea}>
        <LoginButton />
      </div>
    );
  }

  // 기본 정보 입력 안 됐을 때
  if (parseJwt(accessToken).USER_ROLE === 'ROLE_GUEST') {
    return (
      <div className={styles.loginArea}>
        <LogoutButton />
        <WelcomeBubble />
      </div>
    );
  }

  return (
    <>
      <Link href="/profile">마이페이지</Link>
      <div className={styles.loginArea}>
        <LogoutButton />
      </div>
    </>
  );
}
