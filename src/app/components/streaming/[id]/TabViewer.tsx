'use client';

import { useContext } from 'react';
import { SideTabContext } from './SideTabProvider';
import ChattingList from './ChattingList';
import QnASection from './QnASection';
import { Bookmark } from '@/app/lib/types/streaming/vod';

export default function TabViewer() {
  const { tab, setTab } = useContext(SideTabContext);

  return (
    <>
      {tab === 'chatting' && <ChattingList />}
      {tab === 'qna' && <QnASection />}
    </>
  );
}
