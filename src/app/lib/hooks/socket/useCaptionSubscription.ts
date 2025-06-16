import { useEffect, useRef } from 'react';
import { StompSubscription } from '@stomp/stompjs';
import useSocketStore from '../../stores/socketStore';
import { END_POINTS } from '../../constants/common/path';

export interface useCaptionSubscriptionProps {}

const useCaptionSubscription = () => {
  const captionSubscribeRef = useRef<StompSubscription | null>(null);
  const { stompClient, setCaption } = useSocketStore();

  useEffect(() => {
    if (stompClient) {
      const newCaptionSubscribe = stompClient.subscribe(
        END_POINTS.SUBSCRIBE.CAPTION,
        (message) => {
          const newCaption = {
            ...JSON.parse(message.body),
          };
          setCaption(newCaption);

          setTimeout(() => {
            setCaption({ duration: 0, text: '' });
          }, newCaption.duration * 1000);
        }
      );

      if (newCaptionSubscribe)
        captionSubscribeRef.current = newCaptionSubscribe;
    }

    return () => {
      if (captionSubscribeRef.current) {
        captionSubscribeRef.current.unsubscribe();
        captionSubscribeRef.current = null;
      }
    };
  }, [stompClient, setCaption]);
};

export default useCaptionSubscription;
