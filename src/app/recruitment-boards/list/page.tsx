import styles from './page.module.scss';
import {
  RecruitmentBoardDetailProvider
} from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetailProvider';
import ApplyListContainer from '@/app/components/recruitment-boards/list/ApplyListContainer';

export default function Page() {
  return (
    <main className={styles.block}>
      <RecruitmentBoardDetailProvider>
        <ApplyListContainer/>
      </RecruitmentBoardDetailProvider>
    </main>
  )
}