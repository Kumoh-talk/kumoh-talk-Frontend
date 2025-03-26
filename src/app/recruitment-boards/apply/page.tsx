import ApplyBanner from '@/app/components/recruitment-boards/apply/ApplyBanner';
import styles from './page.module.scss';
import RecruitmentApplyForm from '@/app/components/recruitment-boards/apply/RecruitmentApplyForm';
import RecruitmentApplyContainer from '@/app/components/recruitment-boards/apply/RecruitmentApplyContainer';
import Header from '@/app/components/common/header/Header';
import Footer from '@/app/components/common/footer/Footer';
import { matchRecruitmentTitle } from '@/app/lib/apis/recruitment-boards/recruitmentBoard';
import { getQuestions } from '@/app/lib/apis/recruitment-boards/apply/apply';
import { QuestionsResponse } from '@/app/lib/types/recruitmentBoards/apply/apply';

export async function generateMetadata({
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

  const titleFromBoardType = matchRecruitmentTitle(boardType);

  const metaTitle = `야밤의금오톡 ${titleFromBoardType} 신청서 : ${title}`;
  const metaDescription = `${title} 신청서 페이지입니다.`;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ['/images/logo_thumbnail_v1.png'],
    },
  };
}

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
  const isQuestionsError = !questions.data;

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
          isQuestionsError={isQuestionsError}
        />
      </main>
      <Footer />
    </div>
  );
}
