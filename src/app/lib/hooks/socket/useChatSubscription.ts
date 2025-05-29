import { useEffect, useRef } from 'react';
import { StompSubscription } from '@stomp/stompjs';
import useSocketStore from '../../stores/socketStore';
import { END_POINTS } from '../../constants/common/path';

export interface useChatSubscriptionProps {
  chatId: string;
}

const useChatSubscription = (props: useChatSubscriptionProps) => {
  const { chatId } = props;
  const chatSubscribeRef = useRef<StompSubscription | null>(null);
  const { stompClient, addChatMessage } = useSocketStore();

  useEffect(() => {
    if (chatId && stompClient) {
      const newChatSubscribe = stompClient.subscribe(
        END_POINTS.SUBSCRIBE.NEW_CHAT(chatId),
        (message) => {
          const newMessage = {
            chatId: 0,
            ...JSON.parse(message.body),
            time: '01:11',
          };
          addChatMessage(newMessage);
        }
      );

      if (newChatSubscribe) chatSubscribeRef.current = newChatSubscribe;
    }

    return () => {
      if (chatSubscribeRef.current) {
        chatSubscribeRef.current.unsubscribe();
        chatSubscribeRef.current = null;
      }
    };
  }, [chatId, stompClient]);
};

export default useChatSubscription;
