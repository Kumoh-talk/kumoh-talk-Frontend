'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import BasicBubble from '../../../basicBubble/BasicBubble';
import styles from './welcomeBubble.module.scss';
import {
  checkNickname,
  completeRegistration,
  logout,
} from '@/app/lib/apis/user';

export default function WelcomeBubble({ className }: { className?: string }) {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (nickname) {
      setIsAvailable(false);
      if (!nickname.match(/^(([가-힣]{2,6})|([A-Za-z]{4,8}))$/)) {
        setErrorMsg('닉네임은 한글 2~6자 또는 영문 4~8자로 입력해주세요.');
        return () => {};
      }
      setErrorMsg('');

      const delayDebounce = setTimeout(async () => {
        const res = await (await checkNickname(nickname)).json();
        console.log(res);
        if (res.success !== 'true') {
          setErrorMsg('이미 사용중인 닉네임이에요.');
          return;
        }
        setIsAvailable(true);
      }, 500);

      return () => clearTimeout(delayDebounce);
    }
  }, [nickname]);

  const submit = async () => {
    const res = await completeRegistration(nickname, name);
    if (res.status !== 200) {
      setErrorMsg('입력값이 올바르지 않습니다. 다시 확인해주세요.');
      return;
    }
    window.location.reload();
  };

  const onClickLogout = async () => {
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
    <div className={styles.wrapper}>
      <BasicBubble
        direction="right-start"
        className={clsx(className, styles.welcomeBubble)}
        size="large"
      >
        <section className={styles.content}>
          <img
            className={styles.welcome}
            src="/images/welcome.webp"
            alt="welcome"
          />
          <div className={styles.desc}>기본 정보를 입력해주세요!</div>
          <div className={styles.inputWrapper}>
            <div className={styles.fieldWrapper}>
              <span className={styles.label}>이름</span>
              <input
                type="text"
                name="name"
                placeholder="김금오"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.fieldWrapper}>
              <span className={styles.label}>닉네임</span>
              <input
                type="text"
                name="nickname"
                placeholder="개발자"
                value={nickname}
                className={clsx({ [styles.error]: errorMsg })}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          </div>
          {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
          <button
            className={styles.submitButton}
            disabled={!isAvailable}
            onClick={submit}
          >
            입력완료
          </button>
          <button className={styles.logoutButton} onClick={onClickLogout}>
            로그아웃
          </button>
        </section>
      </BasicBubble>
    </div>
  );
}
