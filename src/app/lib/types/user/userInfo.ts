type Provider = 'GOOGLE' | 'GITHUB' | 'NAVER' | 'KAKAO';
type Role =
  | 'ROLE_GUEST'
  | 'ROLE_USER'
  | 'ROLE_ACTIVE_USER'
  | 'ROLE_SEMINAR_WRITER'
  | 'ROLE_ADMIN';

export type UserInfoResponse = {
  success: string;
  data: UserInfo;
};

export type UserInfo = {
  id: number;
  provider: Provider;
  nickname: string;
  name: string;
  profileImageUrl: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export type AdditionalInfoResponse = {
  success: string;
  data: AdditionalInfo;
};

export type AdditionalInfo = {
  email: string;
  department: string;
  studentId: number;
  grade: number;
  studentStatus: string;
  phoneNumber: string;
  isUpdated: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PresignedURLResponse = {
  success: string;
  data: string;
};

export type PatchProfileImageResponse = {
  success: string;
  data: any;
};
