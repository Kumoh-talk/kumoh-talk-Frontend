import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import BoardDetail from '@/app/components/recruitment-boards/apply/BoardDetail';
import { useContext } from 'react';
import { RecruitmentBoardDetailContext } from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetailProvider';

export default function RecruitmentApplayContainer() {
  const { success, data } = useContext(RecruitmentBoardDetailContext)

  return (
    <>
      <RecruitmentBoardTitle title={data.title} type={data.type} tag={data.tag} />
      <BoardDetail/>
    </>
  )
}