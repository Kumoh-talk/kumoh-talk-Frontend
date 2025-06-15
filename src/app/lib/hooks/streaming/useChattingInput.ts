import {
  ChangeEvent,
  KeyboardEvent,
  useRef,
  useState,
  useTransition,
} from 'react';
import useSocketStore from '../../stores/socketStore';
import { END_POINTS } from '../../constants/common/path';
import { UserRoleValidator } from '../../apis/userRoleValidator';

const useChattingInput = (userRole: string, accessToken?: string) => {
  const [content, setContent] = useState('');
  const chattingInputRef = useRef<HTMLInputElement | null>(null);
  const { stompClient, streamId, setLastSend } = useSocketStore();
  const [isPending, startTransition] = useTransition();

  const handleChatting = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!UserRoleValidator.guest(userRole)) {
      alert('로그인 후 이용가능합니다.');
      return;
    }
    if (!UserRoleValidator.user(userRole)) {
      alert('권한이 없습니다.');
      return;
    }
    setContent(e.target.value);
  };

  const handleChattingSubmit = () => {
    if (stompClient) {
      startTransition(() => {
        setLastSend({
          destination: END_POINTS.PUBLISH.CREATE_CHAT(JSON.stringify(streamId)),
          body: JSON.stringify({
            content,
          }),
        });
        stompClient.send(
          END_POINTS.PUBLISH.CREATE_CHAT(JSON.stringify(streamId)),
          {
            Authorization: `Bearer ${accessToken}`,
          },
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

  return {
    chattingInputRef,
    content,
    handleChatting,
    handleChattingSubmit,
    onKeyDownEnter,
    isPending,
  };
};

export default useChattingInput;
