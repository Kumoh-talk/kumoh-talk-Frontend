import { MouseEvent } from 'react';
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

  return (
    <div className={styles.chattingList}>
      {chatMessageList.map((chat) => (
        <div key={chat.chatId} className={styles.chattingItem}>
          <span
            className={styles.chattingUser}
            style={{ color: nameColors[socketId % nameColors.length] }}
          >
            {chat.nickname}: &nbsp;
          </span>
          <span className={styles.chattingContent}>{chat.content}</span>
        </div>
      ))}
    </div>
  );
}
