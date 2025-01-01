import styles from './page.module.scss';
import ApplyButton from '@/app/components/recruitment-boards/detail/ApplyButton';
import ModifyButton from '@/app/components/recruitment-boards/detail/ModifyButton';
import Comment from '@/app/components/common/comment/CommentComponent';
import { Suspense } from 'react';
import RecruitmentBoardDetail from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetail';
import CheckApplicantButton from '@/app/components/recruitment-boards/detail/CheckApplicantButton';
import { RecruitmentBoardDetailProvider } from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetailProvider';
import Header from '@/app/components/common/header/Header';
import Footer from '@/app/components/common/footer/Footer';

export default function Page({
  searchParams,
}: {
  searchParams: { boardType?: 'study' | 'project' | 'mentor' };
}) {
  const title =
    searchParams.boardType === 'study'
      ? '스터디'
      : searchParams.boardType === 'project'
      ? '프로젝트'
      : '멘토링';

  return (
    <>
      <Header title={title} />
      <main className={styles.board}>
        <RecruitmentBoardDetailProvider>
          <Suspense fallback={<p>Loading...</p>}>
            <RecruitmentBoardDetail />
          </Suspense>
          <div className={styles.buttonBlock}>
            <ApplyButton />
            <ModifyButton />
            <CheckApplicantButton />
          </div>
          <Comment />
        </RecruitmentBoardDetailProvider>
      </main>
      <Footer />
    </>
  );
}
