import { cookies } from 'next/headers';
import styles from './page.module.scss';
import StreamKeyField from '@/app/components/streaming/streamKey/StreamKeyField';

export default function Page() {
  return (
    <div className={styles.container}>
      <StreamKeyField />
    </div>
  );
}
