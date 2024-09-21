import styles from './page.module.scss';
import ApplyButton from '@/app/components/study/[id]/ApplyButton';
import ModifyButton from '@/app/components/study/[id]/ModifyButton';
import Comment from '@/app/components/common/comment/CommentComponent';
import { Suspense } from 'react';
import StudyAndProjectDetail from '@/app/components/study/[id]/StudyAndProjectDetail';

// TODO: 백엔드 api 완성되면 수정
export default function Page() {
  return (
    <main className={styles.board}>
      <Suspense fallback={<p>Loading...</p>}>
        <StudyAndProjectDetail />
      </Suspense>
      <div className={styles.buttonBlock}>
        <ApplyButton/>
      </div>
      <div className={styles.buttonBlock}>
        <ModifyButton/>
      </div>
      <Comment/>
    </main>
  )
}