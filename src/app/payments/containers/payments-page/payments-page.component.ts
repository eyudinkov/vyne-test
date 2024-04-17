import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { EventBusService, Event, UnsubscribeService } from '@core/services';

import { PaymentActions } from '@core/state/actions/payments';
import { LoginActions } from '@core/state/actions/auth';
import * as fromPaymensts from '@core/state/reducers/payments';

import { EventTarget, EventName } from '../../interfaces';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'payments-page',
  templateUrl: './payments-page.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [UnsubscribeService],
})
export class PaymentsPageComponent implements OnInit {
  requestLoadingStatus$ = this.store.pipe(
    select(fromPaymensts.selectRequestLoadingStatus)
  );
  data$ = this.store.pipe(select(fromPaymensts.selectPaymentsData));
  params$ = this.store.pipe(select(fromPaymensts.selectParamsReport));

  constructor(
    private store: Store<fromPaymensts.State>,
    private eventBusService: EventBusService,
    private unsubscribeService: UnsubscribeService
  ) {
    this.eventBusService
      .listen(EventTarget.PAYMENTS_PAGE)
      .pipe(takeUntil(this.unsubscribeService.ngUnsubscribe$))
      .subscribe((event) => this.event(event));
  }

  ngOnInit(): void {
    this.eventBusService.emit({
      target: EventTarget.PAYMENTS_PAGE,
      name: EventName.LOAD_REPORT_TABLE,
      data: {},
    });
  }

  event({ name, data }: Event): void {
    switch (name) {
      case EventName.LOAD_REPORT_TABLE:
        this.store.dispatch(
          PaymentActions.getPayments({
            payload: data,
          })
        );
        break;
      case EventName.LOGOUT:
        this.store.dispatch(LoginActions.logout());
        break;

      default:
        break;
    }
  }
}
