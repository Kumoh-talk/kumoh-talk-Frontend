import Modal from '@/app/components/common/modal/Modal';
import ApplicationPage from '@/app/recruitment-boards/list/[id]/page';

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: {
    id: string;
    applicantId: string;
  };
}) {
  return (
    <div>
      <Modal modalId='applicationModal'>
        <ApplicationPage params={params} searchParams={searchParams} />
      </Modal>
    </div>
  );
}
