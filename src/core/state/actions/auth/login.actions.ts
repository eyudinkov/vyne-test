import { createAction, props } from '@ngrx/store';

import { Login } from '../../models/auth';
import { Error } from '../../models/error';

export const login = createAction('[Auth] Login', props<{ payload: Login }>());
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ payload: string }>()
);
export const loginFailed = createAction(
  '[Auth] Login Failed',
  props<{ payload: Error }>()
);

export const logout = createAction('[Auth] Logout');

export const resetState = createAction('[Auth] Reset State');
