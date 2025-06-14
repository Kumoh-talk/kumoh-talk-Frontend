import Link from 'next/link';
import styles from './page.module.scss';
import PageMoreSvg from '../assets/svg/PageMoreSvg';
import StreamingCard from '../components/streaming/StreamingCard';
import { getStreamingList } from '../lib/apis/streaming/streaming';
import { cookies } from 'next/headers';
import { Streaming } from '../lib/types/streaming/streaming';

export default async function Page() {
  const cookieStore = cookies();
  const streamList: Streaming[] = (
    await getStreamingList(cookieStore.toString())
  ).data.streamingList;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Live</h2>
        <Link href='/vod-list'>
          VOD 다시보기
          <PageMoreSvg />
        </Link>
      </div>
      <div className={styles.streamingList}>
        {streamList.map((stream) => (
          <StreamingCard key={stream.streamId} {...stream} />
        ))}
      </div>
    </div>
  );
}
