import ApplyBanner from '@/app/components/recruitment-boards/apply/ApplyBanner';
import styles from './page.module.scss';
import RecruitmentApplyForm from '@/app/components/recruitment-boards/apply/RecruitmentApplyForm';
import RecruitmentApplyContainer from '@/app/components/recruitment-boards/apply/RecruitmentApplyContainer';
import Header from '@/app/components/common/header/Header';
import Footer from '@/app/components/common/footer/Footer';
import { matchRecruitmentTitle } from '@/app/lib/apis/recruitment-boards/recruitmentBoard';
import { getQuestions } from '@/app/lib/apis/recruitment-boards/apply/apply';
import { QuestionsResponse } from '@/app/lib/types/recruitmentBoards/apply/apply';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    id: string;
    title: string;
    boardType: string;
    tag: string;
    detail: string;
  };
}) {
  const { id, title, boardType, tag, detail } = searchParams;
  const headerTitle = matchRecruitmentTitle(searchParams.boardType);
  const questions: QuestionsResponse = await getQuestions(id);

  return (
    <div className={styles.page}>
      <Header title={`${headerTitle} 신청`} />
      <main className={styles.block}>
        <ApplyBanner />
        <RecruitmentApplyContainer
          title={title}
          boardType={boardType}
          tag={tag}
          detail={detail}
        />
        <RecruitmentApplyForm
          recruitmentBoardId={id}
          questions={questions.data}
        />
      </main>
      <Footer />
    </div>
  );
}
