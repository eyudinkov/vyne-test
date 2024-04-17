import { Component, Input, ViewEncapsulation } from '@angular/core';

import { EventBusService } from '@core/services';

import { EventTarget, EventName } from '../../interfaces';
import { PaymentTransactions } from '@core/state/models/payments';
import { Params } from '@core/state/models/params';

@Component({
  selector: 'payments-content',
  templateUrl: './payments-content.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PaymentsContentComponent {
  @Input() data!: PaymentTransactions | null;
  @Input() loading!: boolean | null;
  @Input() params!: Params | null;

  constructor(private eventBusService: EventBusService) {}

  update(): void {
    this.eventBusService.emit({
      target: EventTarget.PAYMENTS_PAGE,
      name: EventName.LOAD_REPORT_TABLE,
      data: this.params,
    });
  }
}
