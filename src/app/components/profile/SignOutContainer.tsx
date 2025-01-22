'use client';

import { useState } from 'react';
import SignOutModal from './SignOutModal';
import styles from './signOutContainer.module.scss';

export default function SignOutContainer() {
  const [isShow, setIsShow] = useState(false);

  const openShowModal = () => {
    setIsShow(true);
  };

  const closeShowModal = () => {
    setIsShow(false);
  };

  return (
    <>
      <span className={styles.cancelSubscription} onClick={openShowModal}>
        회원 탈퇴
      </span>
      {isShow && <SignOutModal onClose={closeShowModal} />}
    </>
  );
}
