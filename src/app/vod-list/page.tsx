import Link from 'next/link';
import styles from './page.module.scss';
import PageMoreSvg from '../assets/svg/PageMoreSvg';
import VodCard from '../components/vod-list/VodCard';
import { getVodList } from '../lib/apis/vod/vod';
import { Vod } from '../lib/types/streaming/vod';
import { cookies } from 'next/headers';
import { parseJwt } from '../lib/apis/auth';
import { UserRoleValidator } from '../lib/apis/userRoleValidator';
import { notFound } from 'next/navigation';

export default async function Page() {
  const vodList = await getVodList(cookies().toString());
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const userRole = accessToken ? parseJwt(accessToken).USER_ROLE : '';

  if (!UserRoleValidator.user(userRole)) {
    notFound();
  }

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
        {vodList.data.vodList.map((vod: Vod) => (
          <VodCard key={vod.vodId} {...vod} />
        ))}
      </div>
    </div>
  );
}
