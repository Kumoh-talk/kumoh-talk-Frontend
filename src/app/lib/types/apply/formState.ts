interface Success {
  code: 'SUCCESS';
  message: string;
}

interface ValidationError {
  code: 'VALIDATION_ERROR';
  fieldErrors: Record<string, string[]>;
}

export type FormState = Success | ValidationError;
