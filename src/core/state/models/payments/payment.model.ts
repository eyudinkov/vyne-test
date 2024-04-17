export enum PaymentStatus {
  CAPTURED = 'CAPTURED',
  COMPLETED = 'COMPLETED',
  CREATED = 'CREATED',
  FAILED = 'FAILED',
  SETTLED = 'SETTLED',
}

export interface Filter {
  text: string;
  value: string;
  checked?: boolean;
}

export interface PaymentTransactions {
  totalNumberOfItems: number;
  numberOfPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  items: Payment[];
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  description: string;
  status: PaymentStatus;
  createdAt: string;
}
