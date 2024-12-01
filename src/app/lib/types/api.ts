export type ApiMessage<T> = {
  success: 'true' | 'false';
  data?: T;
  code?: string;
  msg?: string;
};
