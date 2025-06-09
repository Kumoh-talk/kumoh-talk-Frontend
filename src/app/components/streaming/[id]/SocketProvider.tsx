'use client';

import useChatSubscription from '@/app/lib/hooks/socket/useChatSubscription';
import useErrorSubscription from '@/app/lib/hooks/socket/useErrorSubscription';
import useQnaSubscription from '@/app/lib/hooks/socket/useQnaSubscription';
import useSocketConnect from '@/app/lib/hooks/socket/useSocketConnect';

interface Props {
  paramId: string;
}

export default function SocketProvider({ paramId }: Props) {
  useSocketConnect({ streamId: paramId });
  useChatSubscription({ chatId: paramId });
  useQnaSubscription({ qnaId: paramId });
  useErrorSubscription();

  return <></>;
}
