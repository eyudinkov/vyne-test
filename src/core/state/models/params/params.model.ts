import { PaymentStatus } from '../payments';

export interface Params {
  page: number;
  size: number;
  status: PaymentStatus | null;
  createdAtStart: string | null;
  createdAtEnd: string | null;
}
