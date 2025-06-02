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

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const userRole = accessToken ? parseJwt(accessToken).USER_ROLE : '';

  return (
    <div className={styles.container}>
      <SocketProvider paramId={id} />
      <div className={styles.streamingWrapper}>
        {/* <VideoStreaming /> */}
        <div className={styles.streamingTitle}>JPA란무엇인가?</div>
      </div>
      <div className={styles.sideTapWrapper}>
        <SideTabProvider>
          <div className={styles.chattingSection}>
            <SideTab tabs={['채팅', 'Q&A']} />
            <TabViewer />
            <ChattingInput userRole={userRole} />
            <UtilityTab />
          </div>
        </SideTabProvider>
      </div>
    </div>
  );
}
