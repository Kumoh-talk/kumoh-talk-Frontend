export interface ApplyListApi {
  success: string;
  data: ApplyList;
}

export interface ApplyList {
  pageSize: number;
  pageNum: number;
  totalPage: number;
  pageSort: string;
  applicantList: Applicant[];
}

export interface Applicant {
  applicantId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}