'use client';

import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import BoardDetail from '@/app/components/recruitment-boards/apply/BoardDetail';
import { useContext } from 'react';
import { RecruitmentBoardDetailContext } from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetailProvider';

export default function RecruitmentApplyContainer() {
  const { success, data, fetchData } = useContext(RecruitmentBoardDetailContext);

  if (!data.title) {
    return <p>Loading...</p>
  }

  return (
    <>
      <RecruitmentBoardTitle title={data.title} type={data.type} tag={data.tag} />
      <BoardDetail content={data.content} />
    </>
  )
}