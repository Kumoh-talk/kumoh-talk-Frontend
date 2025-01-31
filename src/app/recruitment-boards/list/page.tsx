import styles from './page.module.scss';
import ApplyListContainer from '@/app/components/recruitment-boards/list/ApplyListContainer';
import Header from '@/app/components/common/header/Header';
import Footer from '@/app/components/common/footer/Footer';
import { getRecruitmentBoardApplicantList } from '@/app/lib/apis/recruitment-boards/list/list';
import { ApplyListApi } from '@/app/lib/types/recruitmentBoards/applyList';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    id: string;
    title: string;
    boardType: string;
    tag: string;
    page: string;
    sort: string;
  };
}) {
  const { id, title, boardType, tag, page, sort } = searchParams;
  const applicantList: ApplyListApi = await getRecruitmentBoardApplicantList(
    id,
    Number(page),
    sort
  );

  return (
    <>
      <Header title={`신청서 확인`} />
      <main className={styles.block}>
        <ApplyListContainer
          id={id}
          title={title}
          boardType={boardType}
          tag={tag}
          applicantList={applicantList}
        />
      </main>
      <Footer />
    </>
  );
}
