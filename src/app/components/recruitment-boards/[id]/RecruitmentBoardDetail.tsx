'use client'

import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/[id]/RecruitmentBoardTitle';
import RecruitmentBoardContent from '@/app/components/recruitment-boards/[id]/RecruitmentBoardContent';
import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';
import { RecruitmentBoardDetailContext } from '@/app/components/recruitment-boards/[id]/RecruitmentBoardDetailProvider';

export default function RecruitmentBoardDetail() {
  const { state, setState, fetchData } = useContext(RecruitmentBoardDetailContext);

  return (
    <main>
      <RecruitmentBoardTitle title={state.data.title} type={state.data.type} tag={state.data.tag}/>
      <RecruitmentBoardContent
        name={state.data.writerNickname}
        categories={[ state.data.type, state.data.tag ]}
        target={state.data.recruitmentTarget}
        recruitmentNum={state.data.recruitmentNum}
        recruitmentStart={dayjs(state.data.recruitmentStart).format('YYYY.MM.DD HH:mm')}
        recruitmentDeadline={dayjs(state.data.recruitmentDeadline).format('YYYY.MM.DD HH:mm')}
        activity={state.data.activityCycle}
        activityStart={dayjs(state.data.activityStart).format('YYYY.MM.DD HH:mm')}
        activityFinish={dayjs(state.data.activityFinish).format('YYYY.MM.DD HH:mm')}
        detail={state.data.content}/>
    </main>
  )
}