import styles from './page.module.scss';
import SideTabProvider from '@/app/components/streaming/[id]/SideTabProvider';
import VideoStreaming from '@/app/components/streaming/[id]/VideoStreaming';
import UtilityTab from '@/app/components/streaming/[id]/UtilityTab';
import { getVodDetail } from '@/app/lib/apis/vod/vod';
import BookmarkSection from '@/app/components/vod-list/[id]/BookmarkSection';
import { VodDetail } from '@/app/lib/types/streaming/vod';
import VideoVod from '@/app/components/vod-list/[id]/VideoVod';

const bookmarkList = [
  {
    bookmarkId: 0,
    userId: 0,
    vodId: 0,
    title: 'JPA 목차',
    time: '02:13',
  },
  {
    bookmarkId: 1,
    userId: 1,
    vodId: 1,
    title: 'JDBC에 대해서',
    time: '05:40',
  },
];

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;

  const vodDetail = (await getVodDetail(id)) as VodDetail;
  console.log(vodDetail);

  return (
    <div className={styles.container}>
      <div className={styles.streamingWrapper}>
        <VideoVod
          camUrl={vodDetail.camUrl}
          camTsQuery={vodDetail.camTsQuery}
          slideUrl={vodDetail.slideUrl}
          slideTsQuery={vodDetail.slideTsQuery}
        />
        <div className={styles.streamingTitle}>JPA란 무엇인가?</div>
      </div>
      <div className={styles.sideTapWrapper}>
        <SideTabProvider>
          <div className={styles.chattingSection}>
            <BookmarkSection bookmarkList={bookmarkList} />
            <UtilityTab />
          </div>
        </SideTabProvider>
      </div>
    </div>
  );
}
