'use client';

import { useContext } from 'react';
import styles from './chattingTabs.module.scss';
import { ChattingTabContext } from './ChattingTabProvider';
import clsx from 'clsx';

export default function ChattingTabs() {
  const { tab, setTab } = useContext(ChattingTabContext);

  const handleTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const selectedTab = target.innerText === '채팅' ? 'chatting' : 'qna';
    setTab(selectedTab);
  };

  return (
    <div className={styles.tabs}>
      <button
        className={clsx(styles.tab, tab === 'chatting' && styles.active)}
        onClick={handleTab}
      >
        채팅
      </button>
      <button
        className={clsx(styles.tab, tab === 'qna' && styles.active)}
        onClick={handleTab}
      >
        Q&A
      </button>
    </div>
  );
}
