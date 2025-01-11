export type Subscription = {
  name: string;
  type: SubscriptionType;
};

export type SubscriptionType =
  | 'seminarContentNotice'
  | 'studyNotice'
  | 'projectNotice'
  | 'mentoringNotice';
