export type UserAdditionalProfile = {
  studentStatus: string;
  department: string;
  grade: number;
  studentId: number;
};

export type ApplicantUserInfo = {
  name: string;
  nickname: string;
  profileImageUrl: string;
  userAdditionalProfile: UserAdditionalProfile;
  createdAt: string;
  updatedAt: string;
};

export type ApplicantUserInfoApi = {
  success: string;
  data: ApplicantUserInfo;
};
