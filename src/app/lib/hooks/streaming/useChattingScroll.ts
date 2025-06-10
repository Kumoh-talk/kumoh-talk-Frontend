import { useRef, useState } from 'react';

const useChattingScroll = () => {
  const chatListRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const checkIsAtBottom = () => {
    if (chatListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatListRef.current;
      const isBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
      setIsAtBottom(isBottom);
      setShowScrollButton(!isBottom);
    }
  };

  const scrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      setIsAtBottom(true);
      setShowScrollButton(false);
    }
  };

  return {
    chatListRef,
    isAtBottom,
    showScrollButton,
    setShowScrollButton,
    checkIsAtBottom,
    scrollToBottom,
  };
};

export default useChattingScroll;
