'use client';

import { logout } from '@/app/lib/apis/user';
import styles from './logoutButton.module.scss';

export default function LogoutButton() {
  const onClick = async () => {
    try {
      const res = await (await logout()).json();
      if (res.success == 'true') {
        console.log('로그아웃 성공');
      }
      window.location.href = '/?logout=true';
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button className={styles.logout} onClick={onClick}>
      로그아웃
    </button>
  );
}
