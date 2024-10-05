import ApplyBanner from '@/app/components/study/[id]/apply/ApplyBanner';
import styles from './page.module.scss'
import BoardDetail from '@/app/components/study/[id]/apply/BoardDetail';
import ApplyForm from '@/app/components/study/[id]/apply/ApplyForm';
import { StudyAndProjectTitle } from '@/app/components/study/[id]/StudyAndProjectTitle';

export default function Page() {
  return (
    <main className={styles.block}>
      <ApplyBanner/>
      <StudyAndProjectTitle/>
      <BoardDetail/>
      <ApplyForm/>
    </main>
  )
}