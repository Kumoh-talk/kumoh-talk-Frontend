export interface PostForm {
  number: number;
  question: string;
  type: selectType;
  isEssential: boolean;
  answerList: AnswerList[];
}

export type selectType = 'description' | 'choice' | 'checkbox';

export interface AnswerList {
  number: number;
  answer: string;
}
