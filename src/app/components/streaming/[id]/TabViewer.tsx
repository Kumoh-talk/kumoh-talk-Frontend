'use client';

import { useContext } from 'react';
import { SideTabContext } from './SideTabProvider';
import ChattingList from './ChattingList';
import QnASection from './QnASection';
import BookmarkSection from '../../vod-list/[id]/BookmarkSection';
import { Bookmark } from '@/app/lib/types/streaming/vod';

interface Props {
  bookmarkList?: Bookmark[];
}

export default function TabViewer({ bookmarkList }: Props) {
  const { tab, setTab } = useContext(SideTabContext);

  return (
    <>
      {tab === 'chatting' && <ChattingList />}
      {tab === 'qna' && <QnASection />}
      {tab === 'bookmark' && <BookmarkSection bookmarkList={bookmarkList!} />}
    </>
  );
}
