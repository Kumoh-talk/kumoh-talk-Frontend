import WriteButton from './writeButton/WriteButton';
import styles from './writeArea.module.scss';
import { cookies } from 'next/headers';
import { parseJwt } from '@/app/lib/apis/auth';

export default function WriteArea() {
  const accessToken = cookies().get('accessToken')?.value;

  // 로그아웃 상태 or 기본 정보 입력 안 된 상태
  if (!accessToken || parseJwt(accessToken).USER_ROLE === 'ROLE_GUEST') {
    return <></>;
  }

  const userRole = parseJwt(accessToken).USER_ROLE;

  const isAdmin = userRole === 'ROLE_ADMIN';
  const isSeminarWriter =
  userRole === 'ROLE_ADMIN' || userRole === 'ROLE_SEMINAR_WRITER';
  
  console.log("🚀 ~ WriteArea ~ isAdmin:", isAdmin);

  return (
    <div className={styles.loginArea}>
      <WriteButton isAdmin={isAdmin} isSeminarWriter={isSeminarWriter} />
    </div>
  );
}
