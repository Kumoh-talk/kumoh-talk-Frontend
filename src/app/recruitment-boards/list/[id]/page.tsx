import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import styles from './page.module.scss';
import ListDetailTable from '@/app/components/recruitment-boards/list/[id]/ListDetailTable';
import { getApplicantDetail } from '@/app/lib/apis/recruitment-boards/list/list';
import { ApplicantDetailApi } from '@/app/lib/types/recruitmentBoards/applicantDetail';

export interface Props {
  params: {
    id: string;
  };
  searchParams: {
    id: string;
    title: string;
    boardType: string;
    tag: string;
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { id: applicantId } = params;
  const { id: recruitmentBoardId, title, boardType, tag } = searchParams;

  const applicantDetail: ApplicantDetailApi = await getApplicantDetail(
    applicantId,
    recruitmentBoardId
  );

  return (
    <main className={styles.block}>
      <RecruitmentBoardTitle title={title} type={boardType} tag={tag} />
      <ListDetailTable applicantDetail={applicantDetail} />
    </main>
  );
}
