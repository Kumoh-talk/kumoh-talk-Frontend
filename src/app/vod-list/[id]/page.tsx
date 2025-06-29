import styles from './page.module.scss';
import SideTabProvider from '@/app/components/streaming/[id]/SideTabProvider';
import { getVodDetail } from '@/app/lib/apis/vod/vod';
import BookmarkSection from '@/app/components/vod-list/[id]/BookmarkSection';
import { VodDetail } from '@/app/lib/types/streaming/vod';
import VideoVod from '@/app/components/vod-list/[id]/VideoVod';
import VodUtilityTab from '@/app/components/vod-list/[id]/VodUtilityTab';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;

  const response = await getVodDetail(id, cookies().toString());
  const vodDetail = response.data as VodDetail;
  console.log(vodDetail);

  if (!vodDetail.camUrl) {
    return notFound();
  }

  return (
    <div className={styles.container}>
      <SideTabProvider>
        <div className={styles.streamingWrapper}>
          <VideoVod
            camUrl={vodDetail.camUrl || ''}
            camTsQuery={vodDetail.camTsQuery}
            slideUrl={vodDetail.slideUrl || ''}
            slideTsQuery={vodDetail.slideTsQuery}
          />
          <div className={styles.streamingTitle}>{vodDetail.title}</div>
        </div>
        <div className={styles.sideTapWrapper}>
          <div className={styles.chattingSection}>
            <BookmarkSection vodId={id} bookmarkList={vodDetail.bookmarks} />
            <VodUtilityTab summary={'요약'} />
          </div>
        </div>
      </SideTabProvider>
    </div>
  );
}
