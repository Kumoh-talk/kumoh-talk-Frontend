export interface QuestionsResponse {
  success: string;
  data: Questions[];
}

export interface Questions {
  questionId: number;
  number: number;
  question: string;
  type: questionType;
  isEssential: boolean;
  answerList: Answer[];
}

export interface Answer {
  answerId: number;
  number: number;
  answer: string;
}

type questionType = 'DESCRIPTION' | 'CHOICE' | 'CHECKBOX';
