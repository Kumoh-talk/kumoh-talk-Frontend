export interface ApplicantDetailApi {
  success: string;
  data: ApplicantDetail;
}

export interface ApplicantDetail {
  applicantId: number;
  applicantAnswer: ApplicantAnswer[];
}

export interface ApplicantAnswer {
  questionId: number;
  questionNumber: number;
  question: string;
  answerList: Answer[];
}

export interface Answer {
  answerId: number;
  answerNumber: number;
  answer: string;
}
