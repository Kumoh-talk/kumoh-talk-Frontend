"use client";

import { useContext } from "react";
import { SideTabContext } from "./SideTabProvider";
import ChattingList from "./ChattingList";
import QnASection from "./QnASection";
import BookmarkSection from "../../vod-list/[id]/BookmarkSection";
import { Chat, Qna } from "@/app/lib/types/streaming/streaming";
import { Bookmark } from "@/app/lib/types/streaming/vod";

interface Props {
  chatList?: Chat[];
  qnaList?: Qna[];
  bookmarkList?: Bookmark[];
}

export default function TabViewer({ chatList, qnaList, bookmarkList }: Props) {
  const { tab, setTab } = useContext(SideTabContext);

  return (
    <>
      {tab === "chatting" && <ChattingList chatList={chatList!} />}
      {tab === "qna" && <QnASection qnaList={qnaList!} />}
      {tab === "bookmark" && <BookmarkSection bookmarkList={bookmarkList!} />}
    </>
  );
}
