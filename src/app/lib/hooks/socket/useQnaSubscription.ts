import { useEffect, useRef } from 'react';
import { StompSubscription } from '@stomp/stompjs';
import useSocketStore from '../../stores/socketStore';
import { END_POINTS } from '../../constants/common/path';
import { Qna } from '../../types/streaming/streaming';

export interface useChatSubscriptionProps {
  qnaId: string;
}

const useQnaSubscription = (props: useChatSubscriptionProps) => {
  const { qnaId } = props;
  const getQnaListSubscribeRef = useRef<StompSubscription | null>(null);
  const newQnaSubscribeRef = useRef<StompSubscription | null>(null);
  const likeQnaSubscribeRef = useRef<StompSubscription | null>(null);
  const deleteQnaSubscribeRef = useRef<StompSubscription | null>(null);
  const { stompClient, setQnaList, addQna, likeQna, myLikedQna, deleteQna } =
    useSocketStore();

  useEffect(() => {
    if (qnaId && stompClient) {
      const getQnaSubscribe = stompClient.subscribe(
        END_POINTS.SUBSCRIBE.GET_QNA_LIST(
          stompClient.ws._transport.url.split('/')[5]
        ),
        (message) => {
          setQnaList(JSON.parse(message.body));
        }
      );

      // Subscribe 후 QnA 리스트 요청 메시지 발행
      stompClient.send(
        END_POINTS.PUBLISH.GET_QNA_LIST(qnaId),
        {},
        JSON.stringify({})
      );

      const addQnaSubscribe = stompClient.subscribe(
        END_POINTS.SUBSCRIBE.NEW_QNA(qnaId),
        (message) => {
          const newQna: Qna = {
            ...JSON.parse(message.body),
          };
          addQna(newQna);
        }
      );

      const likeQnaSubscribe = stompClient.subscribe(
        END_POINTS.SUBSCRIBE.LIKED_QNA(qnaId),
        (message) => {
          const likedId = Number(JSON.parse(message.body).qnaId);
          likeQna(likedId);
          myLikedQna.push(likedId);
        }
      );

      const deleteQnaSubscribe = stompClient.subscribe(
        END_POINTS.SUBSCRIBE.DELETE_QNA(qnaId),
        (message) => {
          const deleteId = Number(JSON.parse(message.body).qnaId);
          deleteQna(deleteId);
        }
      );

      if (getQnaSubscribe) getQnaListSubscribeRef.current = getQnaSubscribe;
      if (addQnaSubscribe) newQnaSubscribeRef.current = addQnaSubscribe;
      if (likeQnaSubscribe) likeQnaSubscribeRef.current = likeQnaSubscribe;
      if (deleteQnaSubscribe)
        deleteQnaSubscribeRef.current = deleteQnaSubscribe;
    }

    return () => {
      if (getQnaListSubscribeRef.current) {
        getQnaListSubscribeRef.current.unsubscribe();
        getQnaListSubscribeRef.current = null;
      }

      if (newQnaSubscribeRef.current) {
        newQnaSubscribeRef.current.unsubscribe();
        newQnaSubscribeRef.current = null;
      }

      if (likeQnaSubscribeRef.current) {
        likeQnaSubscribeRef.current.unsubscribe();
        likeQnaSubscribeRef.current = null;
      }

      if (deleteQnaSubscribeRef.current) {
        deleteQnaSubscribeRef.current.unsubscribe();
        deleteQnaSubscribeRef.current = null;
      }
    };
  }, [qnaId, stompClient, setQnaList, addQna, likeQna, myLikedQna, deleteQna]);
};

export default useQnaSubscription;
