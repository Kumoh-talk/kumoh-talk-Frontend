import ApplyBanner from '@/app/components/recruitment-boards/apply/ApplyBanner';
import styles from './page.module.scss';
import RecruitmentApplyForm from '@/app/components/recruitment-boards/apply/RecruitmentApplyForm';
import RecruitmentApplyContainer from '@/app/components/recruitment-boards/apply/RecruitmentApplyContainer';
import Header from '@/app/components/common/header/Header';
import Footer from '@/app/components/common/footer/Footer';
import { matchRecruitmentTitle } from '@/app/lib/apis/recruitment-boards/recruitmentBoard';
import { getQuestions } from '@/app/lib/apis/recruitment-boards/apply/apply';
import { QuestionsResponse } from '@/app/lib/types/recruitmentBoards/apply/apply';
import { parseJwt } from '@/app/lib/apis/auth';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

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
  const referer = headers().get('referer') || '/';
  const accessToken = cookies().get('accessToken')?.value;
  if (!accessToken) {
    redirect(referer);
  }
  const jwt = parseJwt(cookies().get('accessToken')?.value as string);
  if (jwt.USER_ROLE !== 'ROLE_ACTIVE_USER' && jwt.USER_ROLE !== 'ROLE_ADMIN') {
    redirect(referer);
  }
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
