import { useEffect, useRef } from 'react';
import useSocketStore from '../../stores/socketStore';
import { END_POINTS } from '../../constants/common/path';
import { StompSubscription } from '@stomp/stompjs';
import { tokenRefresh } from '../../utils/tokenRefresh';

const useErrorSubscription = (accessToken: string, refreshToken: string) => {
  const errorSubscribeRef = useRef<StompSubscription | null>(null);
  const { stompClient, lastSend } = useSocketStore();

  useEffect(() => {
    if (stompClient) {
      const errorSubscribe = stompClient.subscribe(
        END_POINTS.SUBSCRIBE.ERROR(stompClient.ws._transport.url.split('/')[5]),
        async (message) => {
          const error = JSON.parse(message.body);
          console.log(error.message);
          if (error.message === '인증 정보가 존재하지 않음') {
            const { newAccessToken } = await tokenRefresh(
              accessToken,
              refreshToken
            );
            if (lastSend) {
              alert('토큰 리프레시');
              stompClient.send(
                lastSend.destination,
                {
                  Authorization: `Bearer ${newAccessToken}`,
                },
                lastSend.body
              );
            }
          }
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
  }, [stompClient, accessToken, refreshToken, lastSend]);
};

export default useErrorSubscription;
