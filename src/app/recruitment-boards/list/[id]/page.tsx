import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import styles from './page.module.scss';
import ListDetailTable from '@/app/components/recruitment-boards/list/[id]/ListDetailTable';

export default function Page() {
  return (
    <main className={styles.block}>
      <RecruitmentBoardTitle title={'제목1'} type={'STUDY'} tag={'FRONT'} />
      <ListDetailTable />
    </main>
  )
}