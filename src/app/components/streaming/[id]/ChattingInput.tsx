'use client';

import { useContext } from 'react';
import styles from './chattingInput.module.scss';
import { SideTabContext } from './SideTabProvider';

export default function ChattingInput() {
  const { tab } = useContext(SideTabContext);

  return (
    <>
      {tab === 'chatting' ? (
        <div className={styles.chattingInput}>
          <input type='text' placeholder='채팅을 입력하세요.' />
        </div>
      ) : null}
    </>
  );
}
