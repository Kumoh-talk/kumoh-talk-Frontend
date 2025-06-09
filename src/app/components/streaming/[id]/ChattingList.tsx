import { useEffect, useRef, useState } from 'react';
import styles from './chattingList.module.scss';
import useSocketStore from '@/app/lib/stores/socketStore';

const nameColors = [
  '#0c80d3',
  '#047143',
  '#ad19e1',
  '#6518c8',
  '#119937',
  '#c40f70',
  '#dd32e0',
  '#1915bf',
  '#0799b9',
  '#0c61e1',
  '#648e0b',
  'e12e2e',
  '#b26c03',
  'eb500d',
  '#c25111',
  '#0b6d82',
];

export default function ChattingList() {
  const { socketId, chatMessageList } = useSocketStore();
  const chatListRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const checkIfAtBottom = () => {
    if (chatListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatListRef.current;
      const isBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
      setIsAtBottom(isBottom);
      setShowScrollButton(!isBottom);
    }
  };

  useEffect(() => {
    const chatList = chatListRef.current;
    if (chatList) {
      chatList.addEventListener('scroll', checkIfAtBottom);
      return () => chatList.removeEventListener('scroll', checkIfAtBottom);
    }
  }, []);

  useEffect(() => {
    if (chatListRef.current && isAtBottom) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    } else if (chatMessageList.length > 0) {
      setShowScrollButton(true);
    }
  }, [chatMessageList, isAtBottom]);

  const scrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      setIsAtBottom(true);
      setShowScrollButton(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chattingList} ref={chatListRef}>
        {chatMessageList.map((chat) => (
          <div key={chat.chatId} className={styles.chattingItem}>
            <span
              className={styles.chattingUser}
              style={{ color: nameColors[chat.userId % nameColors.length] }}
            >
              {chat.nickname}: &nbsp;
            </span>
            <span className={styles.chattingContent}>{chat.content}</span>
          </div>
        ))}
      </div>
      {showScrollButton && (
        <div>
          <button className={styles.scrollButton} onClick={scrollToBottom}>
            {chatMessageList.at(-1)?.nickname}:{' '}
            {chatMessageList.at(-1)?.content}
          </button>
        </div>
      )}
    </div>
  );
}
