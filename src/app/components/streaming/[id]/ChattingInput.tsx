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
  userRole: string;
}

export default function ChattingInput({ userRole }: Props) {
  const chattingInputRef = useRef<HTMLInputElement | null>(null);
  const { tab } = useContext(SideTabContext);
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();
  const { stompClient, streamId } = useSocketStore();

  const handleChatting = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!userRole) {
      alert('로그인 후 이용가능합니다.');
      return;
    }
    if (userRole === 'ROLE_GUEST') {
      alert('권한이 없습니다.');
      return;
    }
    setContent(e.target.value);
  };

  const handleChattingSubmit = () => {
    if (stompClient) {
      startTransition(async () => {
        stompClient.send(
          END_POINTS.PUBLISH.CREATE_CHAT(JSON.stringify(streamId)),
          {},
          JSON.stringify({
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
            maxLength={200}
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
