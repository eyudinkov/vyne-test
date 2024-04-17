import {
  Component,
  OnDestroy,
  AfterViewChecked,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
} from '@angular/router';
import { Subscription } from 'rxjs';

import { EventBusService, Event, UnsubscribeService } from '@core/services';

import { LoginActions } from '@core/state/actions/auth';
import * as fromAuthState from '@core/state/reducers/auth';

import { isAuthPage } from '@core/utils';

import { EventName, EventTarget } from '../../interfaces';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  providers: [UnsubscribeService],
})
export class MainLayoutComponent implements OnDestroy, AfterViewChecked {
  loadingRoute = false;
  showLayout = false;
  routerSubscription: Subscription;

  constructor(
    private store: Store<fromAuthState.State>,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private unsubscribeService: UnsubscribeService,
    private eventBusService: EventBusService
  ) {
    this.routerSubscription = router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof NavigationStart:
          this.showLayout = !isAuthPage((event as NavigationStart).url);
          this.loadingRoute = true;
          break;

        case event instanceof NavigationCancel:
        case event instanceof NavigationEnd:
          this.loadingRoute = false;
          break;
        default:
          break;
      }
    });

    this.eventBusService
      .listen(EventTarget.LAYOUT)
      .pipe(takeUntil(this.unsubscribeService.ngUnsubscribe$))
      .subscribe((event) => this.event(event));
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  event({ name }: Event): void {
    switch (name) {
      case EventName.LOGOUT:
        this.store.dispatch(LoginActions.logout());
        break;

      default:
        break;
    }
  }
}
