import ListTitle from '@/app/components/recruitment-boards/list/ListTitle';
import ListContent from '@/app/components/recruitment-boards/list/ListContent';
import styles from './listTable.module.scss';
import { ApplyListApi } from '@/app/lib/types/recruitmentBoards/applyList';

export interface Props {
  id: string;
  title: string;
  boardType: string;
  tag: string;
  applicantList: ApplyListApi;
}

export default async function ListTable({
  id,
  title,
  boardType,
  tag,
  applicantList,
}: Props) {
  if (!applicantList.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.list}>
      <ListTitle />
      {applicantList.data.applicantList.map((applicant) => (
        <ListContent
          key={applicant.applicantId}
          id={id}
          title={title}
          boardType={boardType}
          tag={tag}
          applicant={applicant}
        />
      ))}
    </div>
  );
}
