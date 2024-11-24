import ApplyBanner from '@/app/components/recruitment-boards/apply/ApplyBanner';
import styles from './page.module.scss'
import ApplyForm from '@/app/components/recruitment-boards/apply/ApplyForm';
import {
  RecruitmentBoardDetailProvider
} from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetailProvider';
import RecruitmentApplayContainer from '@/app/components/recruitment-boards/apply/RecruitmentApplayContainer';

export default function Page() {
  return (
    <main className={styles.block}>
      <RecruitmentBoardDetailProvider>
        <ApplyBanner/>
          <RecruitmentApplayContainer />
        <ApplyForm/>
      </RecruitmentBoardDetailProvider>
    </main>
  )
}