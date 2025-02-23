'use client';

import PenSvg from '@/app/assets/svg/PenSvg';
import styles from './nicknameEdit.module.scss';
import { useState } from 'react';
import NicknameEditModal from './NicknameEditModal';

export default function NicknameEdit() {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div className={styles.editButton} onClick={() => setIsShow(!isShow)}>
        <PenSvg />
      </div>
      {isShow && <NicknameEditModal onClose={() => setIsShow(false)} />}
    </>
  );
}
