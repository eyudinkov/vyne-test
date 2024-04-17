import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UnsubscribeService
  extends Observable<unknown>
  implements OnDestroy
{
  readonly ngUnsubscribe$ = new Subject();

  constructor() {
    super((subscriber) => this.ngUnsubscribe$.subscribe(subscriber));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
