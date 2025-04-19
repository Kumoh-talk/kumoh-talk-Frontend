import styles from './chattingInput.module.scss';

export default function ChattingInput() {
  return (
    <div className={styles.chattingInput}>
      <input type='text' placeholder='채팅을 입력하세요.' />
    </div>
  );
}
