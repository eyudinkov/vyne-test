import { Component, ViewEncapsulation } from '@angular/core';
import { EventBusService } from '@core/services';
import { EventTarget, EventName } from '../../interfaces';

@Component({
  selector: 'payments',
  templateUrl: './payments.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PaymentsComponent {
  constructor(private eventBusService: EventBusService) {}

  logout(): void {
    this.eventBusService.emit({
      target: EventTarget.PAYMENTS_PAGE,
      name: EventName.LOGOUT,
    });
  }
}
