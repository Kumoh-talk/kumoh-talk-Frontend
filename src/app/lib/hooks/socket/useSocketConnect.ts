import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import useSocketStore from '../../stores/socketStore';
import { WEBSOCKET_URL } from '../../constants/common/path';
import { useEffect } from 'react';

export interface useSocketConnectProps {
  streamId: string;
}

export default function useSocketConnect({ streamId }: useSocketConnectProps) {
  const { setStompClient, setStreamId, setSocketId } = useSocketStore();

  const onConnect = () => {
    const client = Stomp.over(function () {
      return new SockJS(WEBSOCKET_URL);
    });

    client.connect({}, () => {
      setStompClient(client);
      setStreamId(Number(streamId));
      setSocketId(Math.floor(Math.random() * 7));
    });
  };

  useEffect(() => {
    onConnect();
  }, []);
}
