import {
  ChangeEvent,
  KeyboardEvent,
  useRef,
  useState,
  useTransition,
} from 'react';
import { UserRoleValidator } from '../../apis/userRoleValidator';
import useSocketStore from '../../stores/socketStore';
import { END_POINTS } from '../../constants/common/path';

const useChattingInput = (userRole: string, accessToken?: string) => {
  const userRoleValidator = new UserRoleValidator();
  const [content, setContent] = useState('');
  const chattingInputRef = useRef<HTMLInputElement | null>(null);
  const { stompClient, streamId } = useSocketStore();
  const [isPending, startTransition] = useTransition();

  const handleChatting = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!userRoleValidator.guest(userRole)) {
      alert('로그인 후 이용가능합니다.');
      return;
    }
    if (!userRoleValidator.user(userRole)) {
      alert('권한이 없습니다.');
      return;
    }
    setContent(e.target.value);
  };

  const handleChattingSubmit = () => {
    if (stompClient) {
      startTransition(() => {
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
