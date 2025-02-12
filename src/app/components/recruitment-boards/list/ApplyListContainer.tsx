import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import { Suspense } from 'react';
import ListTable from '@/app/components/recruitment-boards/list/ListTable';
import { ApplyListApi } from '@/app/lib/types/recruitmentBoards/applyList';

export interface Props {
  id: string;
  title: string;
  boardType: string;
  tag: string;
  applicantList: ApplyListApi;
}

export default async function ApplyListContainer({
  id,
  title,
  boardType,
  tag,
  applicantList,
}: Props) {
  return (
    <>
      <RecruitmentBoardTitle title={title} type={boardType} tag={tag} />
      <Suspense fallback={<div>Loading...</div>}>
        <ListTable
          id={id}
          title={title}
          boardType={boardType}
          tag={tag}
          applicantList={applicantList}
        />
      </Suspense>
    </>
  );
}
