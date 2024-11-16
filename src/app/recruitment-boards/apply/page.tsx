import ApplyBanner from '@/app/components/recruitment-boards/apply/ApplyBanner';
import styles from './page.module.scss'
import BoardDetail from '@/app/components/recruitment-boards/apply/BoardDetail';
import ApplyForm from '@/app/components/recruitment-boards/apply/ApplyForm';
import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/[id]/RecruitmentBoardTitle';

export default function Page() {
  return (
    <main className={styles.block}>
      <ApplyBanner />
      <RecruitmentBoardTitle title={'제목1'} type={'STUDY'} tag={'FRONT'} />
      <BoardDetail/>
      <ApplyForm/>
    </main>
  )
}