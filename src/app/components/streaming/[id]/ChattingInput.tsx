'use client';

import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useRef,
  useState,
  useTransition,
} from 'react';
import styles from './chattingInput.module.scss';
import { SideTabContext } from './SideTabProvider';
import { Send } from 'lucide-react';

export default function ChattingInput() {
  const chattingInputRef = useRef<HTMLInputElement | null>(null);
  const { tab } = useContext(SideTabContext);
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChatting = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleChattingSubmit = () => {
    startTransition(async () => {
      setContent('');
      chattingInputRef.current?.focus();
      console.log(content);
    });
  };

  const onKeyDownEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleChattingSubmit();
    }
  };

  return (
    <>
      {tab === 'chatting' ? (
        <div className={styles.chattingInput}>
          <input
            ref={chattingInputRef}
            type='text'
            placeholder='채팅을 입력하세요.'
            name='content'
            value={content}
            onChange={handleChatting}
            onKeyDown={onKeyDownEnter}
          />
          {content && (
            <button
              className={styles.sendButton}
              onClick={handleChattingSubmit}
              disabled={isPending}
            >
              <Send />
            </button>
          )}
        </div>
      ) : null}
    </>
  );
}
