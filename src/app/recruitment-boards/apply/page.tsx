import ApplyBanner from '@/app/components/recruitment-boards/apply/ApplyBanner';
import styles from './page.module.scss'
import ApplyForm from '@/app/components/recruitment-boards/apply/ApplyForm';
import {
  RecruitmentBoardDetailProvider
} from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetailProvider';
import RecruitmentApplyContainer from '@/app/components/recruitment-boards/apply/RecruitmentApplyContainer';

export default function Page() {
  return (
    <main className={styles.block}>
      <ApplyBanner/>
      <RecruitmentBoardDetailProvider>
        <RecruitmentApplyContainer/>
      </RecruitmentBoardDetailProvider>
      <ApplyForm/>
    </main>
  )
}