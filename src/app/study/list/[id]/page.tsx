import { StudyAndProjectTitle } from '@/app/components/study/[id]/StudyAndProjectTitle';
import styles from './page.module.scss';
import ListDetailTable from '@/app/components/study/list/[id]/ListDetailTable';

export default function Page() {
  return (
    <main className={styles.block}>
      <StudyAndProjectTitle title={'제목1'} type={'STUDY'} tag={'FRONT'} />
      <ListDetailTable />
    </main>
  )
}