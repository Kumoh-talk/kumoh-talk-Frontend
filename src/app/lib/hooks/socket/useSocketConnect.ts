import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import useSocketStore from '../../stores/socketStore';
import { WEBSOCKET_URL } from '../../constants/common/path';
import { useEffect } from 'react';

export interface useSocketConnectProps {
  streamId: string;
}

export default function useSocketConnect({ streamId }: useSocketConnectProps) {
  const { setStompClient, setStreamId } = useSocketStore();

  const onConnect = () => {
    const client = Stomp.over(function () {
      return new SockJS(WEBSOCKET_URL);
    });

    // 디버그 로그를 없애기 위해 빈 함수로 덮어쓰는 코드 배포 시 주석 해제하기
    // client.debug = () => {};

    client.connect({}, () => {
      setStompClient(client);
      setStreamId(Number(streamId));
    });
  };

  useEffect(() => {
    onConnect();
  }, []);
}
