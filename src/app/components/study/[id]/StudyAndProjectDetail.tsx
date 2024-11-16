'use client'

import { StudyAndProjectTitle } from '@/app/components/study/[id]/StudyAndProjectTitle';
import StudyAndProjectContent from '@/app/components/study/[id]/StudyAndProjectContent';
import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';
import { StudyAndProjectDetailContext } from '@/app/components/study/[id]/StudyAndProjectDetailProvider';

export default function StudyAndProjectDetail() {
  const { state, setState, fetchData } = useContext(StudyAndProjectDetailContext);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!state.data.title) {
    return <p>Loading...</p>
  }

  return (
    <main>
      <StudyAndProjectTitle title={state.data.title} type={state.data.type} tag={state.data.tag}/>
      <StudyAndProjectContent
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