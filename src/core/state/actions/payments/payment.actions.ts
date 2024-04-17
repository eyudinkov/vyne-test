import { createAction, props } from '@ngrx/store';

import { PaymentTransactions } from '../../models/payments';
import { Error } from '../../models/error';
import { Params } from '@core/state/models/params';

export const getPayments = createAction(
  '[Payments] Get Payments',
  props<{ payload: Params }>()
);
export const getPaymentsSuccess = createAction(
  '[Payments] Get Payments Success',
  props<{ payload: PaymentTransactions }>()
);
export const getPaymentsFailed = createAction(
  '[Payments] Get Payments Failed',
  props<{ payload: Error }>()
);
