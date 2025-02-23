export interface RecruitmentBoardsApi {
  success: string;
  data: RecruitmentBoards;
}

export interface RecruitmentBoards {
  boardId: number; // 모집 게시물 id 정보
  userId: number; // 모집 게시물 작성자 유저 id 정보
  title: string; // 모집 게시물 제목 정보
  summary: string; // 모집 게시물 요약 내용 정보
  host: string; // 모집 게시물 주최자 정보
  content: string; // 모집 게시물 내용 정보
  type: 'STUDY' | 'PROJECT' | 'MENTORING'; // 모집 게시물 타입 정보
  tag: 'FRONTEND' | 'BACKEND' | 'AI' | 'MOBILE' | 'SECURITY'; // 모집 게시물 태그 정보
  status: 'DRAFT' | 'PUBLISHED'; // 모집 게시물 상태 정보
  recruitmentTarget: string; // 모집 게시물 모집 대상 정보
  recruitmentNum: number; // 모집 게시물 모집 인원
  currentMemberNum: number; // 모집 게시물 현재 인원
  recruitmentStart: string; // 모집 시작 날짜 및 시간
  recruitmentDeadline: string; // 모집 마감 날짜 및 시간
  activityStart: string; // 활동 시작 날짜 및 시간
  activityFinish: string; // 활동 종료 날자 및 시간
  activityCycle: string; // 활동 주기
}

export type RecruitmentType = 'STUDY' | 'PROJECT' | 'MENTORING';
export type RecruitmentTag =
  | 'STUDY'
  | 'PROJECT'
  | 'FRONTEND'
  | 'BACKEND'
  | 'MOBILE'
  | 'SECURITY'
  | 'AI'
  | 'MENTORING'
  | 'ETC';

export type RecruitmentArticle = {
  boardId: number;
  title: string;
  summary: string;
  type: RecruitmentType;
  tag: RecruitmentTag;
  commentCount: number;
  recruitmentTarget: string;
  recruitmentNum: number;
  currentMemberNum: number;
  recruitmentStart: string;
  recruitmentDeadline: string;
};

export type RecruitmentByPageResponse = {
  pageSize: number;
  pageNum: number;
  totalPage: number;
  pageSort: string;
  boardInfo: RecruitmentArticle[];
};
