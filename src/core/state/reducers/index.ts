import { InjectionToken, isDevMode } from '@angular/core';
import {
  ActionReducer,
  MetaReducer,
  ActionReducerMap,
  Action,
} from '@ngrx/store';

import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromAuth from './auth';
import * as fromPayment from './payments';

export const localStorageSyncReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return localStorageSync({
    keys: [
      {
        auth: ['credentials'],
      },
    ],
    rehydrate: true,
  })(reducer);
};

export interface State {}

export const ROOT_REDUCER = new InjectionToken<ActionReducerMap<State, Action>>(
  'Root reducer token',
  {
    factory: () => ({
      [fromAuth.authKey]: fromAuth.reducers,
      [fromPayment.paymentsKey]: fromPayment.reducers,
    }),
  }
);

export const stateReducerMap = (
  reducer: ActionReducer<State>
): ActionReducer<State> => {
  return (state, action) => {
    if (action.type === '[Auth] Logout') {
      state = undefined;
    }
    const result = reducer(state, action);

    return result;
  };
};

export const stateLogger = (
  reducer: ActionReducer<State>
): ActionReducer<State> => {
  return (state, action) => {
    const result = reducer(state, action);

    console.groupCollapsed(action.type);
    console.log('prevState', state);
    console.log('action', action);
    console.log('newState', result);
    console.groupEnd();

    return result;
  };
};

export const metaReducers: MetaReducer<State>[] = !isDevMode()
  ? [stateReducerMap, localStorageSyncReducer]
  : [stateReducerMap, localStorageSyncReducer, stateLogger];
