export interface TagType {
  [key: string]: string;
}

export const typeToText: TagType = {
  STUDY: '스터디',
  PROJECT: '프로젝트',
  FRONTEND: '프론트',
  BACKEND: '백엔드',
  MOBILE: '모바일',
  SECURITY: '보안',
  AI: '인공지능',
  MENTORING: '멘토링',
  ETC: '기타',
};

export const textToType: TagType = {
  스터디: 'STUDY',
  프로젝트: 'PROJECT',
  프론트: 'FRONTEND',
  백엔드: 'BACKEND',
  모바일: 'MOBILE',
  보안: 'SECURITY',
  인공지능: 'AI',
  멘토링: 'MENTORING',
  기타: 'ETC',
};
