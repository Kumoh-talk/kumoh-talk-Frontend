import ApplyBanner from '@/app/components/recruitment-boards/apply/ApplyBanner';
import styles from './page.module.scss';
import ApplyForm from '@/app/components/recruitment-boards/apply/ApplyForm';
import { RecruitmentBoardDetailProvider } from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetailProvider';
import RecruitmentApplyContainer from '@/app/components/recruitment-boards/apply/RecruitmentApplyContainer';
import Header from '@/app/components/common/header/Header';
import Footer from '@/app/components/common/footer/Footer';

export default function Page({
  searchParams,
}: {
  searchParams: { boardType: string };
}) {
  const title =
    searchParams.boardType === 'study'
      ? '스터디'
      : searchParams.boardType === 'project'
      ? '프로젝트'
      : '멘토링';

  return (
    <>
      <Header title={`${title} 신청`} />
      <main className={styles.block}>
        <ApplyBanner />
        <RecruitmentBoardDetailProvider>
          <RecruitmentApplyContainer />
        </RecruitmentBoardDetailProvider>
        <ApplyForm />
      </main>
      <Footer />
    </>
  );
}
