import {
  Component,
  OnDestroy,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
} from '@angular/router';
import { Subscription } from 'rxjs';

import { isAuthPage } from '@core/utils';
@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnDestroy, AfterViewChecked {
  loadingRoute = false;
  showLayout = false;
  routerSubscription: Subscription;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
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
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }
}
