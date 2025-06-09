import Link from 'next/link';
import styles from './page.module.scss';
import PageMoreSvg from '../assets/svg/PageMoreSvg';
import VodCard from '../components/vod-list/VodCard';
import { getVodList } from '../lib/apis/vod/vod';
import { Vod } from '../lib/types/streaming/vod';

export default async function Page() {
  const vodList: Vod[] = await getVodList();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>VOD 다시보기</h2>
        <Link href='/streaming'>
          Live 스트리밍
          <PageMoreSvg />
        </Link>
      </div>
      <div className={styles.vodList}>
        {vodList.map((vod: Vod) => (
          <VodCard key={vod.vodId} {...vod} />
        ))}
      </div>
    </div>
  );
}
