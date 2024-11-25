'use client';

import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import { Suspense, useContext } from 'react';
import ListTable from '@/app/components/recruitment-boards/list/ListTable';
import {
  RecruitmentBoardDetailContext
} from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetailProvider';

export default function ApplyListContainer() {
  const { success, data, fetchData } = useContext(RecruitmentBoardDetailContext);

  return (
    <>
      <RecruitmentBoardTitle title={data.title} type={data.type} tag={data.tag}/>
      <Suspense fallback={<div>Loading...</div>}>
        <ListTable/>
      </Suspense>
    </>
  )
}