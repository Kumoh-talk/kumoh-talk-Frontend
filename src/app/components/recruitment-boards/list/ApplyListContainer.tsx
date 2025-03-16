import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import ListTable from '@/app/components/recruitment-boards/list/ListTable';
import { ApplyListApi } from '@/app/lib/types/recruitmentBoards/applyList';
import styles from './applyListContainer.module.scss';
import { RecruitmentTag } from '@/app/lib/types/recruitmentBoards/recruitmentBoards';

export interface Props {
  id: string;
  title: string;
  boardType: RecruitmentTag;
  tag: RecruitmentTag;
  name: string;
  pageContent: ApplyListApi;
}

export default async function ApplyListContainer({
  id,
  title,
  boardType,
  tag,
  name,
  pageContent,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <RecruitmentBoardTitle
        title={title}
        type={boardType}
        tag={tag}
        name={name}
      />
      <ListTable
        id={id}
        title={title}
        boardType={boardType}
        tag={tag}
        name={name}
        pageContent={pageContent}
      />
    </div>
  );
}
