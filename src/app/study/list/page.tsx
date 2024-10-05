import { StudyAndProjectTitle } from '@/app/components/study/[id]/StudyAndProjectTitle';
import styles from './page.module.scss';
import ListTable from '@/app/components/study/list/ListTable';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main className={styles.block}>
      <StudyAndProjectTitle title={'제목1'} type={'STUDY'} tag={'FRONT'}/>
      <Suspense fallback={<div>Loading...</div>}>
        <ListTable/>
      </Suspense>
    </main>
  )
}