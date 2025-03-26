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
    recruitmentBoardId: string;
    applicantUserId: string;
  };
}

export default async function Page({ params, searchParams }: Props) {
  try {
    const { id: applicantId } = params;
    const { recruitmentBoardId, applicantUserId } = searchParams;

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
  } catch (error) {
    console.error('Error in Page component:', error);
    return (
      <main className={styles.block}>
        <div>오류가 발생했습니다. 잠시 후 다시 시도해주세요.</div>
      </main>
    );
  }
}
