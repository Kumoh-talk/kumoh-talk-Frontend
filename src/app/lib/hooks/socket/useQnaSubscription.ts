import { useEffect, useRef } from 'react';
import { StompSubscription } from '@stomp/stompjs';
import useSocketStore from '../../stores/socketStore';
import { END_POINTS } from '../../constants/common/path';

export interface useChatSubscriptionProps {
  qnaId: string;
}

const useChatSubscription = (props: useChatSubscriptionProps) => {
  const { qnaId } = props;
  const newQnaSubscribeRef = useRef<StompSubscription | null>(null);
  const deleteQnaSubscribeRef = useRef<StompSubscription | null>(null);
  const { stompClient, addQna, deleteQna } = useSocketStore();

  useEffect(() => {
    if (qnaId && stompClient) {
      const addQnaSubscribe = stompClient.subscribe(
        END_POINTS.SUBSCRIBE.NEW_QNA(qnaId),
        (message) => {
          const newQna = {
            qnaId: 0,
            ...JSON.parse(message.body),
            time: '01:11',
            likes: 0,
          };
          addQna(newQna);
        }
      );

      const deleteQnaSubscribe = stompClient.subscribe(
        END_POINTS.SUBSCRIBE.DELETE_QNA(qnaId),
        (message) => {
          deleteQna(Number(message.body));
        }
      );

      if (addQnaSubscribe) newQnaSubscribeRef.current = addQnaSubscribe;
      if (deleteQnaSubscribe)
        deleteQnaSubscribeRef.current = deleteQnaSubscribe;
    }

    return () => {
      if (newQnaSubscribeRef.current) {
        newQnaSubscribeRef.current.unsubscribe();
        newQnaSubscribeRef.current = null;
      }

      if (deleteQnaSubscribeRef.current) {
        deleteQnaSubscribeRef.current.unsubscribe();
        deleteQnaSubscribeRef.current = null;
      }
    };
  }, [qnaId, stompClient]);
};

export default useChatSubscription;
