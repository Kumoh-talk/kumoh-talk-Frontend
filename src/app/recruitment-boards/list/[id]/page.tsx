import styles from './page.module.scss';
import ListDetailTable from '@/app/components/recruitment-boards/list/[id]/ListDetailTable';
import { getApplicantDetail } from '@/app/lib/apis/recruitment-boards/list/list';
import { ApplicantDetailApi } from '@/app/lib/types/recruitmentBoards/applicantDetail';
import { cookies } from 'next/headers';

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
    <main className={styles.block}>
      <ListDetailTable applicantDetail={applicantDetail} />
    </main>
  );
}
