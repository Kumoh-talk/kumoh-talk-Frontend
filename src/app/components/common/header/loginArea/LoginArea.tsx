import LoginButton from './loginButton/LoginButton';
import LogoutButton from './logoutButton/LogoutButton';
import styles from './loginArea.module.scss';
import { getUserInfo } from '@/app/lib/apis/user';
import { cookies } from 'next/headers';
import WelcomeBubble from './welcomeBubble/WelcomeBubble';
import { parseJwt } from '@/app/lib/apis/auth';

export default async function LoginArea() {
  const accessToken = cookies().get('accessToken')?.value;

  const offline = (
    <div className={styles.loginArea}>
      <LoginButton />
    </div>
  );

  // 로그아웃 상태
  if (!accessToken) {
    return offline;
  }
  const userInfoResponse = await getUserInfo(cookies().toString());
  const userInfo = await userInfoResponse.json();
  
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
    <div className={styles.loginArea}>
      <LogoutButton />
    </div>
  );
}
