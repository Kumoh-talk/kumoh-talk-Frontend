'use client';

import { useContext } from 'react';
import { ChattingTabContext } from './ChattingTabProvider';
import ChattingList from './ChattingList';
import QnASection from './QnASection';

interface Props {
  chatList: {
    chatId: number;
    socketId: number;
    name: string;
    content: string;
    time: string;
  }[];
  qnaList: {
    qnaId: number;
    name: string;
    content: string;
    time: string;
    likes: number;
    isAnswered: boolean;
  }[];
}

export default function TabViewer({ chatList, qnaList }: Props) {
  const { tab, setTab } = useContext(ChattingTabContext);

  return (
    <>
      {tab === 'chatting' ? (
        <ChattingList chatList={chatList} />
      ) : (
        <QnASection qnaList={qnaList} />
      )}
    </>
  );
}
