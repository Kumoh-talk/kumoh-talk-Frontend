export interface ApplyListApi {
  success: string;
  data: ApplyList;
}

export interface ApplyList {
  pageSize: number;
  pageNum: number;
  totalPage: number;
  pageSort: string;
  pageContent: Applicant[];
}

export interface Applicant {
  applicantId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
