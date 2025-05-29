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
import useSocketStore from '@/app/lib/stores/socketStore';
import { END_POINTS } from '@/app/lib/constants/common/path';

interface Props {
  chatId: string;
}

export default function ChattingInput({ chatId }: Props) {
  const chattingInputRef = useRef<HTMLInputElement | null>(null);
  const { tab } = useContext(SideTabContext);
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();
  const { stompClient } = useSocketStore();

  const handleChatting = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleChattingSubmit = () => {
    if (stompClient) {
      startTransition(async () => {
        stompClient.send(
          END_POINTS.PUBLISH.CREATE_CHAT(chatId),
          {},
          JSON.stringify({
            name: '대용진',
            content,
          })
        );
        setContent('');
        chattingInputRef.current?.focus();
      });
    }
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
