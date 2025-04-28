'use client';

import { useContext } from 'react';
import { SideTabContext } from './SideTabProvider';
import ChattingList from './ChattingList';
import QnASection from './QnASection';
import BookmarkSection from '../../vod-list/[id]/BookmarkSection';

interface Props {
  chatList?: {
    chatId: number;
    socketId: number;
    name: string;
    content: string;
    time: string;
  }[];
  qnaList?: {
    qnaId: number;
    name: string;
    content: string;
    time: string;
    likes: number;
    isAnswered: boolean;
  }[];
  bookmarkList?: {
    bookmarkId: number;
    userId: number;
    vodId: number;
    title: string;
    time: string;
  }[];
}

export default function TabViewer({ chatList, qnaList, bookmarkList }: Props) {
  const { tab, setTab } = useContext(SideTabContext);

  return (
    <>
      {tab === 'chatting' && <ChattingList chatList={chatList!} />}
      {tab === 'qna' && <QnASection qnaList={qnaList!} />}
      {tab === 'bookmark' && <BookmarkSection bookmarkList={bookmarkList!} />}
    </>
  );
}
