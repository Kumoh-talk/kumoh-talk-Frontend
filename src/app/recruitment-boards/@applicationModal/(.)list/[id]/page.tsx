import Modal from '@/app/components/common/modal/Modal';
import ApplicationPage from '@/app/recruitment-boards/list/[id]/page';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    id: string;
    applicantId: string;
  }>;
}) {
  const { id: applicantId } = await params;
  const { id: recruitmentBoardId, applicantId: applicantUserId } =
    await searchParams;

  return (
    <div>
      <Modal modalId='applicationModal'>
        <ApplicationPage
          params={params}
          searchParams={searchParams}
        />
      </Modal>
    </div>
  );
}
