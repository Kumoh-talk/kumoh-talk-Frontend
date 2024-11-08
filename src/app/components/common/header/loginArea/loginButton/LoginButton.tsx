'use client';

import { useState } from 'react';
import LoginBubble from './loginBubble/LoginBubble';
import styles from './loginButton.module.scss';

export default function LoginButton() {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <button className={styles.login} onClick={() => setIsActive(true)}>로그인 / 회원가입</button>
      {isActive && (
        <LoginBubble
          className={styles.bubble}
          onClose={() => setIsActive(false)}
        />
      )}
    </>
  );
}
