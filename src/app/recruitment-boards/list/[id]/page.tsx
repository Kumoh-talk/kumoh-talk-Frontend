import ApplicationTitle from '@/app/components/recruitment-boards/list/[id]/ApplicationTitle';
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
    applicantId: string;
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { id: applicantId } = params;
  const { id: recruitmentBoardId, applicantId: applicantUserId } =
    searchParams;

  const applicantDetail: ApplicantDetailApi = await getApplicantDetail(
    applicantId,
    recruitmentBoardId,
    cookies().toString()
  );

  return (
    <main className={styles.block}>
      <ApplicationTitle applicantUserId={applicantUserId} />
      <ListDetailTable applicantDetail={applicantDetail} />
    </main>
  );
}
