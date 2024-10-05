'use client'

import { StudyAndProjectTitle } from '@/app/components/study/[id]/StudyAndProjectTitle';
import StudyAndProjectContent from '@/app/components/study/[id]/StudyAndProjectContent';
import useGetStudyProjectBoardDetail from '@/app/lib/hooks/useGetStudyProjectBoardDetail';
import dayjs from 'dayjs';

const boardId = '이건 보드Id';

export default function StudyAndProjectDetail() {
  // const { data } = useGetStudyProjectBoardDetail(boardId);

  return (
    <>
      <StudyAndProjectTitle title={'제목1'} type={'STUDY'} tag={'FRONT'}/>
      <StudyAndProjectContent
        name={'황준호'}
        categories={[ '스터디', '프론트' ]}
        target={'컴퓨터공학과'}
        recruitmentNum={'10'}
        recruitmentStart={dayjs('2024-07-20T08:00:00').format('YYYY.MM.DD HH:mm')}
        recruitmentDeadline={dayjs('2024-09-10T23:59:59').format('YYYY.MM.DD HH:mm')}
        activity={'주 2회 화요일(대면), 수요일(비대면)'}
        activityStart={dayjs('2024-07-20T08:00:00').format('YYYY.MM.DD HH:mm')}
        activityFinish={dayjs('2024-07-30T10:00:00').format('YYYY.MM.DD HH:mm')}
        detail={'해킹하는법을 배워서 학점을 고칠예정'}/>
    </>
  )
}