import styles from './chattingList.module.scss';

interface Props {
  chatList: {
    chatId: number;
    name: string;
    content: string;
    time: string;
  }[];
}

export default function ChattingList({ chatList }: Props) {
  return (
    <div className={styles.chattingList}>
      {chatList.map((chat) => (
        <div key={chat.chatId} className={styles.chattingItem}>
          <span className={styles.chattingUser}>{chat.name}: &nbsp;</span>
          <span className={styles.chattingContent}>{chat.content}</span>
        </div>
      ))}
    </div>
  );
}
