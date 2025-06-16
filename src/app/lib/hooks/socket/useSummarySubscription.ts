import { useEffect, useRef } from 'react';
import { StompSubscription } from '@stomp/stompjs';
import useSocketStore from '../../stores/socketStore';
import { END_POINTS } from '../../constants/common/path';

const useSummarySubscription = () => {
  const summarySubscribeRef = useRef<StompSubscription | null>(null);
  const { stompClient, setSummary } = useSocketStore();

  useEffect(() => {
    if (stompClient) {
      const newSummarySubscribe = stompClient.subscribe(
        END_POINTS.SUBSCRIBE.SUMMARY,
        (message) => {
          const newSummary = {
            ...JSON.parse(message.body).summary,
          };
          setSummary(newSummary);
        }
      );

      if (newSummarySubscribe)
        summarySubscribeRef.current = newSummarySubscribe;
    }

    return () => {
      if (summarySubscribeRef.current) {
        summarySubscribeRef.current.unsubscribe();
        summarySubscribeRef.current = null;
      }
    };
  }, [stompClient, setSummary]);
};

export default useSummarySubscription;
