import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface BusEvent {
  target: string;
  name: string;
  data?: any | null;
}

export interface Event {
  name: string;
  data?: any | null;
}

@Injectable()
export class EventBusService {
  private eventBus$ = new Subject<BusEvent>();

  public listen(target: string): Observable<Event> {
    return this.eventBus$.pipe(
      filter((e: BusEvent) => e.target === target),
      map(({ name, data = null }: BusEvent) => ({
        name,
        data,
      }))
    );
  }

  public emit(event: BusEvent): void {
    this.eventBus$.next(event);
  }
}
