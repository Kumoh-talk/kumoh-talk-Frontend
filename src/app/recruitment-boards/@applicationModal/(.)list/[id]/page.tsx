import Modal from '@/app/components/common/modal/Modal';
import { getApplicantUserInfo } from '@/app/lib/apis/recruitment-boards/list/list';
import { ApplicantUserInfoApi } from '@/app/lib/types/recruitmentBoards/applicantUser';
import ApplicationPage from '@/app/recruitment-boards/list/[id]/page';

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id: applicantId } = params;

  const applicantDetail: ApplicantUserInfoApi = await getApplicantUserInfo(
    Number(applicantId)
  );

  const applicantName = applicantDetail.data.name;
  const metaTitle = `야밤의금오톡 신청서 : ${applicantName}`;
  const metaDescription = `${applicantName}의 신청 내역입니다.`;

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

export default async function Page({ ...props }: any) {
  return (
    <div>
      <Modal modalId='applicationModal'>
        <ApplicationPage {...props} />
      </Modal>
    </div>
  );
}
