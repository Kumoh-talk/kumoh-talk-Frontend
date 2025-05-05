'use client';

import { useContext } from 'react';
import { SideTabContext } from './SideTabProvider';
import ChattingList from './ChattingList';
import QnASection from './QnASection';
import BookmarkSection from '../../vod-list/[id]/BookmarkSection';
import { Chat, Qna } from '@/app/lib/types/streaming/streaming';
import { Bookmark } from '@/app/lib/types/streaming/vod';
import VoteCard from './VoteCard';

const dummyVote = {
  name: '몇 학년이신가요?',
  multiple: false,
  select: [
    {
      id: 1,
      content: '1학년',
    },
    {
      id: 2,
      content: '2학년',
    },
    {
      id: 3,
      content: '3학년',
    },
    {
      id: 4,
      content: '4학년',
    },
  ],
};

interface Props {
  chatList?: Chat[];
  qnaList?: Qna[];
  bookmarkList?: Bookmark[];
}

export default function TabViewer({ chatList, qnaList, bookmarkList }: Props) {
  const { tab, setTab } = useContext(SideTabContext);

  return (
    <>
      {tab === 'chatting' && <ChattingList chatList={chatList!} />}
      {tab === 'qna' && <QnASection qnaList={qnaList!} />}
      {tab === 'bookmark' && <BookmarkSection bookmarkList={bookmarkList!} />}
      <VoteCard vote={dummyVote} />
    </>
  );
}
