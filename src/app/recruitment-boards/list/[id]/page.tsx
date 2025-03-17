import ApplicationTitle from '@/app/components/recruitment-boards/list/[id]/ApplicationTitle';
import styles from './page.module.scss';
import ListDetailTable from '@/app/components/recruitment-boards/list/[id]/ListDetailTable';
import { getApplicantDetail } from '@/app/lib/apis/recruitment-boards/list/list';
import { ApplicantDetailApi } from '@/app/lib/types/recruitmentBoards/applicantDetail';
import { cookies } from 'next/headers';

export interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    id: string;
    applicantId: string;
  }>;
}

export default async function Page({ params, searchParams }: Props) {
  try {
    const { id: applicantId } = await params;
    const { id: recruitmentBoardId, applicantId: applicantUserId } =
      await searchParams;

    if (!applicantId || !recruitmentBoardId) {
      throw new Error('필수 파라미터가 누락되었습니다');
    }

    const applicantDetail: ApplicantDetailApi = await getApplicantDetail(
      applicantId,
      recruitmentBoardId,
      cookies().toString()
    );

    if (!applicantDetail) {
      throw new Error('지원자 정보를 불러오는데 실패했습니다');
    }

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
