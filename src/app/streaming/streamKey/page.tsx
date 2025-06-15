import { cookies } from 'next/headers';
import styles from './page.module.scss';
import StreamKeyField from '@/app/components/streaming/streamKey/StreamKeyField';
import { parseJwt } from '@/app/lib/apis/auth';
import { UserRoleValidator } from '@/app/lib/apis/userRoleValidator';
import { notFound } from 'next/navigation';

export default function Page() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const userRole = accessToken ? parseJwt(accessToken).USER_ROLE : '';

  if (!UserRoleValidator.admin(userRole)) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <StreamKeyField />
    </div>
  );
}
