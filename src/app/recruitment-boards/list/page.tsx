import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import styles from './page.module.scss';
import ListTable from '@/app/components/recruitment-boards/list/ListTable';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main className={styles.block}>
      <RecruitmentBoardTitle title={'제목1'} type={'STUDY'} tag={'FRONT'}/>
      <Suspense fallback={<div>Loading...</div>}>
        <ListTable/>
      </Suspense>
    </main>
  )
}