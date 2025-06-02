'use client';

import { useContext } from 'react';
import { SideTabContext } from './SideTabProvider';
import ChattingList from './ChattingList';
import QnASection from './QnASection';

interface Props {
  userRole: string;
}

export default function TabViewer({ userRole }: Props) {
  const { tab, setTab } = useContext(SideTabContext);

  return (
    <>
      {tab === 'chatting' && <ChattingList />}
      {tab === 'qna' && <QnASection userRole={userRole} />}
    </>
  );
}
