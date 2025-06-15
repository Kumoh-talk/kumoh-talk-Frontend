'use client';

import { useContext } from 'react';
import styles from './chattingInput.module.scss';
import { SideTabContext } from './SideTabProvider';
import { Send } from 'lucide-react';
import useChattingInput from '@/app/lib/hooks/streaming/useChattingInput';

interface Props {
  userRole: string;
  accessToken?: string;
}

export default function ChattingInput({ userRole, accessToken }: Props) {
  const { tab } = useContext(SideTabContext);
  const {
    chattingInputRef,
    content,
    handleChatting,
    handleChattingSubmit,
    onKeyDownEnter,
    isPending,
  } = useChattingInput(userRole, accessToken);

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
