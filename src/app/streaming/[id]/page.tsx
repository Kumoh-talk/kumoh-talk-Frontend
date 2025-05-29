'use client';

import styles from './page.module.scss';
import SideTab from '@/app/components/streaming/[id]/SideTab';
import SideTabProvider from '@/app/components/streaming/[id]/SideTabProvider';
import ChattingInput from '@/app/components/streaming/[id]/ChattingInput';
import VideoStreaming from '@/app/components/streaming/[id]/VideoStreaming';
import TabViewer from '@/app/components/streaming/[id]/TabViewer';
import UtilityTab from '@/app/components/streaming/[id]/UtilityTab';
import useSocketConnect from '@/app/lib/hooks/socket/useSocketConnect';
import useChatSubscription from '@/app/lib/hooks/socket/useChatSubscription';

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  const { id } = params;

  useSocketConnect();
  useChatSubscription({ chatId: id });

  return (
    <div className={styles.container}>
      <div className={styles.streamingWrapper}>
        <VideoStreaming />
        <div className={styles.streamingTitle}>JPA란무엇인가?</div>
      </div>
      <div className={styles.sideTapWrapper}>
        <SideTabProvider>
          <div className={styles.chattingSection}>
            <SideTab tabs={['채팅', 'Q&A']} />
            <TabViewer />
            <ChattingInput chatId={id} />
            <UtilityTab />
          </div>
        </SideTabProvider>
      </div>
    </div>
  );
}
