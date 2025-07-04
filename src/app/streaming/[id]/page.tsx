import styles from './page.module.scss';
import SideTab from '@/app/components/streaming/[id]/SideTab';
import SideTabProvider from '@/app/components/streaming/[id]/SideTabProvider';
import ChattingInput from '@/app/components/streaming/[id]/ChattingInput';
import VideoStreaming from '@/app/components/streaming/[id]/VideoStreaming';
import TabViewer from '@/app/components/streaming/[id]/TabViewer';
import UtilityTab from '@/app/components/streaming/[id]/UtilityTab';
import SocketProvider from '@/app/components/streaming/[id]/SocketProvider';
import { cookies } from 'next/headers';
import { parseJwt } from '@/app/lib/apis/auth';
import { getStreamingDetail } from '@/app/lib/apis/streaming/streaming';
import { streamingDetail } from '@/app/lib/types/streaming/streaming';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const userRole = accessToken ? parseJwt(accessToken).USER_ROLE : '';
  const streamDetail = (await getStreamingDetail(id, cookieStore.toString()))
    .data as streamingDetail;

  if (!streamDetail.camUrl) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <SocketProvider
        paramId={id}
        accessToken={accessToken || ''}
        refreshToken={refreshToken || ''}
      />
      <SideTabProvider>
        <div className={styles.streamingWrapper}>
          <VideoStreaming
            camUrl={streamDetail.camUrl}
            slideUrl={streamDetail.slideUrl}
          />
          <div className={styles.streamingTitle}>{streamDetail.title}</div>
        </div>
        <div className={styles.sideTapWrapper}>
          <div className={styles.chattingSection}>
            <SideTab tabs={['채팅', 'Q&A']} />
            <TabViewer accessToken={accessToken} userRole={userRole} />
            <ChattingInput accessToken={accessToken} userRole={userRole} />
            <UtilityTab accessToken={accessToken} streamId={id} />
          </div>
        </div>
      </SideTabProvider>
    </div>
  );
}
