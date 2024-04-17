import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers,
} from '@ngrx/store';

import * as fromPayment from './payment.reducer';

import * as fromRoot from '../index';

export const paymentsKey = 'payments';

export interface PaymentsState {
  [fromPayment.statusKey]: fromPayment.State;
}

export interface State extends fromRoot.State {
  [paymentsKey]: PaymentsState;
}

export const reducers = (state: PaymentsState | undefined, action: Action) => {
  return combineReducers({
    [fromPayment.statusKey]: fromPayment.reducer,
  })(state, action);
};

export const selectPaymentState =
  createFeatureSelector<PaymentsState>(paymentsKey);

// Payment state
export const selectPaymentListState = createSelector(
  selectPaymentState,
  (state) => state.payment_list
);
export const selectRequestLoadingStatus = createSelector(
  selectPaymentListState,
  fromPayment.getRequestLoadingStatus
);
export const selectPaymentsData = createSelector(
  selectPaymentListState,
  fromPayment.getData
);
export const selectParamsReport = createSelector(
  selectPaymentListState,
  fromPayment.getParams
);
