export interface StudyProjectBoardApi {
  success: string;
  data: StudyProjectBoard;
}

export interface StudyProjectBoard {
  boardId: number;
  writerNickname: string;
  writerPhoneNumber: string;
  title: string;
  summary: string;
  content: string;
  type: 'STUDY' | 'PROJECT';
  tag: string;
  status: string;
  recruitmentTarget: string;
  recruitmentNum: string;
  recruitmentStart: string;
  recruitmentDeadline: string;
  activityStart: string;
  activityFinish: string;
  activityCycle: string;
}