'use client';

import { useContext } from 'react';
import styles from './sideTab.module.scss';
import { SideTabContext } from './SideTabProvider';
import clsx from 'clsx';

function getTabText(text: string) {
  switch (text) {
    case '채팅':
      return 'chatting';
    case 'Q&A':
      return 'qna';
    case '북마크':
      return 'bookmark';
    default:
      return '';
  }
}

interface Props {
  tabs: string[];
}

export default function SideTab({ tabs }: Props) {
  const { tab, setTab } = useContext(SideTabContext);

  const handleTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const selectedTab = getTabText(target.innerText);
    setTab(selectedTab);
  };

  return (
    <div className={styles.tabs}>
      {tabs.map((tabText) => (
        <button
          key={tabText}
          className={clsx(
            styles.tab,
            tab === `${getTabText(tabText)}` && styles.active
          )}
          onClick={handleTab}
        >
          {tabText}
        </button>
      ))}
    </div>
  );
}
