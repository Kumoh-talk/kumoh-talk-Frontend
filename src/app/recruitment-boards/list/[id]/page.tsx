import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import styles from './page.module.scss';
import ListDetailTable from '@/app/components/recruitment-boards/list/[id]/ListDetailTable';
import { getApplicantDetail } from '@/app/lib/apis/recruitment-boards/list/list';
import { ApplicantDetailApi } from '@/app/lib/types/recruitmentBoards/applicantDetail';
import { cookies } from 'next/headers';
import Header from '@/app/components/common/header/Header';
import Footer from '@/app/components/common/footer/Footer';

export interface Props {
  params: {
    id: string;
  };
  searchParams: {
    id: string;
    title: string;
    boardType: string;
    tag: string;
    name: string;
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { id: applicantId } = params;
  const { id: recruitmentBoardId, title, boardType, tag, name } = searchParams;

  const applicantDetail: ApplicantDetailApi = await getApplicantDetail(
    applicantId,
    recruitmentBoardId,
    cookies().toString()
  );

  return (
    <>
      <Header title={`신청서 확인`} />
      <main className={styles.block}>
        <RecruitmentBoardTitle
          title={title}
          type={boardType}
          tag={tag}
          name={name}
        />
        <ListDetailTable applicantDetail={applicantDetail} />
      </main>
      <Footer />
    </>
  );
}
