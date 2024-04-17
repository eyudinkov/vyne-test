import { Component, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

import { EventBusService, Event, UnsubscribeService } from '@core/services';

import { LoginActions } from 'core/state/actions/auth';

import { EventName, EventTarget } from '../../interfaces';

import * as fromAuth from '@core/state/reducers/auth';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [UnsubscribeService],
})
export class LoginPageComponent {
  requestLoadingStatus$ = this.store.pipe(
    select(fromAuth.selectRequestLoadingStatus)
  );
  error$ = this.store.pipe(select(fromAuth.selectRequestError));

  constructor(
    private store: Store<fromAuth.State>,
    private eventBusService: EventBusService,
    private unsubscribeService: UnsubscribeService
  ) {
    this.eventBusService
      .listen(EventTarget.AUTH)
      .pipe(takeUntil(this.unsubscribeService.ngUnsubscribe$))
      .subscribe((event) => this.event(event));
  }

  event({ name, data }: Event): void {
    switch (name) {
      case EventName.LOGIN:
        this.store.dispatch(LoginActions.login({ payload: data }));
        break;

      default:
        break;
    }
  }
}
