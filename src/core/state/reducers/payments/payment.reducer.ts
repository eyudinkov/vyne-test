import { createReducer, on } from '@ngrx/store';

import { PaymentActions } from '../../actions/payments';
import { Error } from '../../models/error';
import { PaymentTransactions } from '../../models/payments';
import { Params } from '../../models/params/params.model';

export const statusKey = 'payment_list';

export interface State {
  requestLoadingStatus: boolean;
  error: Error | null;
  data: PaymentTransactions | null;
  params: Params;
}

export const initState: State = {
  requestLoadingStatus: false,
  error: null,
  data: null,
  params: {
    page: 0,
    size: 5,
    createdAtEnd: null,
    createdAtStart: null,
    status: null,
  },
};

export const reducer = createReducer(
  initState,
  on(
    PaymentActions.getPayments,
    (
      state,
      {
        payload: {
          page = 0,
          size = 5,
          createdAtEnd = null,
          createdAtStart = null,
          status = null,
        },
      }
    ) => ({
      ...state,
      requestLoadingStatus: true,
      error: null,
      params: {
        page,
        size,
        createdAtEnd,
        createdAtStart,
        status,
      },
    })
  ),
  on(PaymentActions.getPaymentsSuccess, (state, { payload }) => ({
    ...state,
    error: null,
    data: payload,
    requestLoadingStatus: false,
  })),
  on(PaymentActions.getPaymentsFailed, (state, { payload }) => ({
    ...state,
    requestLoadingStatus: false,
    error: payload,
  }))
);

export const getRequestLoadingStatus = (state: State) =>
  state.requestLoadingStatus;
export const getData = (state: State) => state.data;
export const getParams = (state: State) => state.params;
