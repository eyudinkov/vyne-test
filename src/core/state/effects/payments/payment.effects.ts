import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

import { PaymentActions } from '@core/state/actions/payments';

import { PaymentTransactions } from '@core/state/models/payments';

import { PaymentService } from '@core/services';

import { StatusCodes } from 'http-status-codes';
import { Params } from '@angular/router';

@Injectable()
export class PaymentsEffects {
  constructor(
    private actions$: Actions,
    private paymentService: PaymentService,
    private message: NzMessageService
  ) {}

  protected stands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.getPayments),
      map((action) => action.payload),
      exhaustMap((request: Params) =>
        this.paymentService.getTransactionsList(request).pipe(
          map((paymentData: PaymentTransactions) =>
            PaymentActions.getPaymentsSuccess({ payload: paymentData })
          ),
          catchError((err) => {
            const { status, error } = err;
            if (status === StatusCodes.UNAUTHORIZED) {
              this.message.error('You are not authorized');
            } else {
              this.message.error('Error fetching payments');
            }
            return of(PaymentActions.getPaymentsFailed({ payload: error }));
          })
        )
      )
    )
  );
}
