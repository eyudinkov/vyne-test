import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

import { LoginActions } from '@core/state/actions/auth';

import { Login } from '@core/state/models/auth';

import { AuthService, StorageService } from '@core/services';

import { StatusCodes } from 'http-status-codes';

import { TOKEN } from '@core/constants';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService,
    private storage: StorageService
  ) {}

  protected login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      map((action) => action.payload),
      exhaustMap((auth: Login) => {
        const incomingToken = btoa(`${auth.login}:${auth.password}`);

        if (incomingToken !== TOKEN) {
          const httpError = new HttpErrorResponse({
            status: StatusCodes.UNAUTHORIZED,
          });
          this.message.error('Invalid login or password');
          return of(LoginActions.loginFailed({ payload: httpError.error }));
        }

        return this.authService.login(incomingToken).pipe(
          map((token: string) => LoginActions.loginSuccess({ payload: token })),
          catchError((err: HttpErrorResponse) => {
            const { status, error } = err;

            if (status === StatusCodes.UNAUTHORIZED) {
              this.message.error('Invalid login or password');
            } else {
              this.message.error('Unexpected error occurred');
            }

            return of(LoginActions.loginFailed({ payload: error }));
          })
        );
      })
    )
  );

  protected logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.logout),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  protected authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/payments']);
        })
      ),
    { dispatch: false }
  );
}
