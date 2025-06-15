'use client';

import useCaptionSubscription from '@/app/lib/hooks/socket/useCaptionSubscription';
import useChatSubscription from '@/app/lib/hooks/socket/useChatSubscription';
import useErrorSubscription from '@/app/lib/hooks/socket/useErrorSubscription';
import useQnaSubscription from '@/app/lib/hooks/socket/useQnaSubscription';
import useSocketConnect from '@/app/lib/hooks/socket/useSocketConnect';
import useVoteSubscription from '@/app/lib/hooks/socket/useVoteSubscription';

interface Props {
  paramId: string;
  accessToken: string;
  refreshToken: string;
}

export default function SocketProvider({
  paramId,
  accessToken,
  refreshToken,
}: Props) {
  useSocketConnect({ streamId: paramId });
  useChatSubscription({ chatId: paramId });
  useQnaSubscription({ qnaId: paramId });
  useVoteSubscription({ streamId: paramId });
  useCaptionSubscription();
  useErrorSubscription(accessToken, refreshToken);

  return <></>;
}
