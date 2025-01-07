export interface PostForm {
  number: number;
  question: string;
  type: description;
  isEssential: boolean;
  answerList: AnswerList[];
}

export type description = 'description' | 'choice' | 'checkbox';

export interface AnswerList {
  number: number;
  answer: string;
}
