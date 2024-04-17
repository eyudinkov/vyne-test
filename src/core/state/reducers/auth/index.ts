import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers,
} from '@ngrx/store';

import * as fromAuth from './auth.reducer';
import * as fromStates from './states.reducer';
import * as fromRoot from '../index';

export const authKey = 'auth';

export interface AuthState {
  [fromAuth.statusKey]: fromAuth.State;
  [fromStates.statusKey]: fromStates.State;
}

export interface State extends fromRoot.State {
  [authKey]: AuthState;
}

export const reducers = (state: AuthState | undefined, action: Action) => {
  return combineReducers({
    [fromAuth.statusKey]: fromAuth.reducer,
    [fromStates.statusKey]: fromStates.reducer,
  })(state, action);
};

export const selectAuthState = createFeatureSelector<AuthState>(authKey);

// Status State
export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state) => state.credentials
);
export const selectToken = createSelector(
  selectAuthStatusState,
  fromAuth.getToken
);

// States state
export const selectLoginState = createSelector(
  selectAuthState,
  (state) => state.auth_states
);
export const selectRequestError = createSelector(
  selectLoginState,
  fromStates.getError
);
export const selectRequestLoadingStatus = createSelector(
  selectLoginState,
  fromStates.getRequestLoadingStatus
);
