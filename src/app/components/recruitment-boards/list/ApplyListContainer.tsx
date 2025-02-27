import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import { Suspense } from 'react';
import ListTable from '@/app/components/recruitment-boards/list/ListTable';
import { ApplyListApi } from '@/app/lib/types/recruitmentBoards/applyList';

export interface Props {
  id: string;
  title: string;
  boardType: string;
  tag: string;
  name: string;
  applicantList: ApplyListApi;
}

export default async function ApplyListContainer({
  id,
  title,
  boardType,
  tag,
  name,
  applicantList,
}: Props) {
  return (
    <>
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
        applicantList={applicantList}
      />
    </>
  );
}
