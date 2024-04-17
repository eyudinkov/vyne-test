import { HttpErrorResponse } from '@angular/common/http';

export interface Error extends HttpErrorResponse {
  code: string;
  error_id: string;
  message: string;
  status: number;
}
