import { createReducer, on } from '@ngrx/store';

import { LoginActions } from '../../actions/auth';

import { Error } from '../../models/error';

export const statusKey = 'auth_states';

export interface State {
  error: Error | null;
  requestLoadingStatus: boolean;
}

export const initState: State = {
  error: null,
  requestLoadingStatus: false,
};

export const reducer = createReducer(
  initState,
  on(LoginActions.login, (state) => ({
    ...state,
    error: null,
    requestLoadingStatus: true,
  })),
  on(LoginActions.loginSuccess, (state) => ({
    ...state,
    error: null,
    requestLoadingStatus: false,
  })),
  on(LoginActions.loginFailed, (state, { payload }) => ({
    ...state,
    error: payload,
    requestLoadingStatus: false,
  }))
);

export const getError = (state: State) => state.error;
export const getRequestLoadingStatus = (state: State) =>
  state.requestLoadingStatus;
