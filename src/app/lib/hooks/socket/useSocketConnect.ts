import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import useSocketStore from '../../stores/socketStore';
import { WEBSOCKET_URL } from '../../constants/common/path';
import { useEffect } from 'react';

export default function useSocketConnect() {
  const { setStompClient, setSocketId } = useSocketStore();

  const onConnect = () => {
    const client = Stomp.over(function () {
      return new SockJS(WEBSOCKET_URL);
    });

    client.connect({}, () => {
      setStompClient(client);
      setSocketId(Math.floor(Math.random() * 7));
    });
  };

  useEffect(() => {
    onConnect();
  }, []);
}
