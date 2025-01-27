import ApplyBanner from '@/app/components/recruitment-boards/apply/ApplyBanner';
import styles from './page.module.scss';
import ApplyForm from '@/app/components/recruitment-boards/apply/ApplyForm';
import { RecruitmentBoardDetailProvider } from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetailProvider';
import RecruitmentApplyForm from '@/app/components/recruitment-boards/apply/RecruitmentApplyForm';
import RecruitmentApplyContainer from '@/app/components/recruitment-boards/apply/RecruitmentApplyContainer';
import Header from '@/app/components/common/header/Header';
import Footer from '@/app/components/common/footer/Footer';
import { matchRecruitmentTitle } from '@/app/lib/apis/recruitment-boards/boardDetail';

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { boardType: string };
}) {
  const title = matchRecruitmentTitle(searchParams.boardType);

  return (
    <>
      <Header title={`${title} 신청`} />
      <main className={styles.block}>
        <ApplyBanner />
        <RecruitmentApplyForm />
        <RecruitmentBoardDetailProvider>
          <RecruitmentApplyContainer />
        </RecruitmentBoardDetailProvider>
        <ApplyForm />
      </main>
      <Footer />
    </>
  );
}
