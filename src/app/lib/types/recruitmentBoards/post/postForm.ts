export interface PostForm {
  number: number;
  question: string;
  type: selectType;
  isEssential: boolean;
  answerList: Answer[];
  error: string;
}

export type selectType = 'description' | 'choice' | 'checkbox';

export interface Answer {
  number: number;
  answer: string;
}
