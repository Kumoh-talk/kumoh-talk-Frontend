import Modal from '@/app/components/common/modal/Modal';
import ApplicationPage from '@/app/recruitment-boards/list/[id]/page';

export default function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  return (
    <div>
      <Modal modalId='applicationModal'>
        <ApplicationPage params={params} searchParams={searchParams} />
      </Modal>
    </div>
  );
}
