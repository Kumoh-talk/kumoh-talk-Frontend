import { useEffect, useRef } from 'react';
import useSocketStore from '../../stores/socketStore';
import { END_POINTS } from '../../constants/common/path';
import { StompSubscription } from '@stomp/stompjs';

const useErrorSubscription = () => {
  const errorSubscribeRef = useRef<StompSubscription | null>(null);
  const { stompClient } = useSocketStore();

  useEffect(() => {
    if (stompClient) {
      const errorSubscribe = stompClient.subscribe(
        END_POINTS.SUBSCRIBE.ERROR(stompClient.ws._transport.url.split('/')[5]),
        (message) => {
          const error = JSON.parse(message.body);
          console.log(error);
        }
      );

      if (errorSubscribe) errorSubscribeRef.current = errorSubscribe;
    }

    return () => {
      if (errorSubscribeRef.current) {
        errorSubscribeRef.current.unsubscribe();
        errorSubscribeRef.current = null;
      }
    };
  }, [stompClient]);
};

export default useErrorSubscription;
