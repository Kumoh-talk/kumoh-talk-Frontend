'use client';

import { useContext } from 'react';
import { ChattingTabContext } from './ChattingTabProvider';
import ChattingList from './ChattingList';
import QnASection from './QnASection';

interface Props {
  chatList: {
    chatId: number;
    name: string;
    content: string;
    time: string;
  }[];
}

export default function TabViewer({ chatList }: Props) {
  const { tab, setTab } = useContext(ChattingTabContext);

  return (
    <>
      {tab === 'chatting' ? (
        <ChattingList chatList={chatList} />
      ) : (
        <QnASection />
      )}
    </>
  );
}
