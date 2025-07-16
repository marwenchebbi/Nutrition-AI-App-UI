export interface ErrorResponse {
  errorDetails?: {
    message: string;
    code?: string;
  };
  message?: string;
  status?: number;
} 