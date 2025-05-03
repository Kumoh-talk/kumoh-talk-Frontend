import { Chat } from '@/app/lib/types/streaming/streaming';
import styles from './chattingList.module.scss';

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

interface Props {
  chatList: Chat[];
}

export default function ChattingList({ chatList }: Props) {
  return (
    <div className={styles.chattingList}>
      {chatList.map((chat) => (
        <div key={chat.chatId} className={styles.chattingItem}>
          <span
            className={styles.chattingUser}
            style={{ color: nameColors[chat.socketId % nameColors.length] }}
          >
            {chat.name}: &nbsp;
          </span>
          <span className={styles.chattingContent}>{chat.content}</span>
        </div>
      ))}
    </div>
  );
}
