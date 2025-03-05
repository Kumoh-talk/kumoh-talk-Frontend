import Modal from '@/app/components/common/modal/Modal';
import ApplicationPage from '@/app/recruitment-boards/list/[id]/page';

export default function Page(props: any) {
  return (
    <div>
      <Modal modalId="applicationModal">
        <ApplicationPage {...props} />
      </Modal>
    </div>
  );
}
