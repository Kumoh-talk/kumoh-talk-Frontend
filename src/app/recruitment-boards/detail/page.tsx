import styles from './page.module.scss';
import ApplyButton from '@/app/components/recruitment-boards/detail/ApplyButton';
import ModifyButton from '@/app/components/recruitment-boards/detail/ModifyButton';
import Comment from '@/app/components/common/comment/CommentComponent';
import { Suspense } from 'react';
import RecruitmentBoardDetail from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetail';
import CheckApplicantButton from '@/app/components/recruitment-boards/detail/CheckApplicantButton';
import { RecruitmentBoardDetailProvider } from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetailProvider';

// TODO: 백엔드 api 완성되면 수정
export default function Page() {
  return (
    <main className={styles.board}>
      <RecruitmentBoardDetailProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <RecruitmentBoardDetail/>
        </Suspense>
        <div className={styles.buttonBlock}>
          <ApplyButton/>
          <ModifyButton/>
          <CheckApplicantButton/>
        </div>
        <Comment/>
      </RecruitmentBoardDetailProvider>
    </main>
  )
}