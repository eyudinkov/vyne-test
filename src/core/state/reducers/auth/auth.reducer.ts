import { createReducer, on } from '@ngrx/store';

import { LoginActions } from '../../actions/auth';

export const statusKey = 'credentials';

export interface State {
  token: string | null;
}

export const initState: State = {
  token: null,
};

export const reducer = createReducer(
  initState,
  on(LoginActions.loginSuccess, (state, { payload }) => ({
    ...state,
    token: payload,
  }))
);

export const getToken = (state: State) => state.token;
