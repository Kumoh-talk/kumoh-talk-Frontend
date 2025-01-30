import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import { Suspense } from 'react';
import ListTable from '@/app/components/recruitment-boards/list/ListTable';
import { getRecruitmentBoardApplicantList } from '@/app/lib/apis/recruitment-boards/list/list';

export interface Props {
  id: string;
  title: string;
  boardType: string;
  tag: string;
  page: string;
  sort: string;
}

export default async function ApplyListContainer({
  id,
  title,
  boardType,
  tag,
  page,
  sort,
}: Props) {
  return (
    <>
      <RecruitmentBoardTitle title={title} type={boardType} tag={tag} />
      <Suspense fallback={<div>Loading...</div>}>
        <ListTable id={id} page={page} sort={sort} />
      </Suspense>
    </>
  );
}
