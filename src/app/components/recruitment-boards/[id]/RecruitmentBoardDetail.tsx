'use client'

import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/[id]/RecruitmentBoardTitle';
import RecruitmentBoardContent from '@/app/components/recruitment-boards/[id]/RecruitmentBoardContent';
import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';
import { RecruitmentBoardDetailContext } from '@/app/components/recruitment-boards/[id]/RecruitmentBoardDetailProvider';

export default function RecruitmentBoardDetail() {
  const { success, data, fetchData } = useContext(RecruitmentBoardDetailContext);

  if (!data.title) {
    return <p>Loading...</p>
  }

  return (
    <main>
      <RecruitmentBoardTitle title={data.title} type={data.type} tag={data.tag}/>
      <RecruitmentBoardContent
        name={data.writerNickname}
        categories={[ data.type, data.tag ]}
        target={data.recruitmentTarget}
        recruitmentNum={data.recruitmentNum}
        recruitmentStart={dayjs(data.recruitmentStart).format('YYYY.MM.DD HH:mm')}
        recruitmentDeadline={dayjs(data.recruitmentDeadline).format('YYYY.MM.DD HH:mm')}
        activity={data.activityCycle}
        activityStart={dayjs(data.activityStart).format('YYYY.MM.DD HH:mm')}
        activityFinish={dayjs(data.activityFinish).format('YYYY.MM.DD HH:mm')}
        detail={data.content}/>
    </main>
  )
}