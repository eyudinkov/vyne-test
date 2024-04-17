import { Pipe, PipeTransform } from '@angular/core';

import { PaymentStatus } from '@core/state/models/payments';

@Pipe({
  name: 'statusMapper',
})
export class StatusMapperPipe implements PipeTransform {
  transform(value: PaymentStatus | string): string {
    switch (value) {
      case PaymentStatus.CAPTURED:
        return 'blue';
      case PaymentStatus.COMPLETED:
        return 'green';
      case PaymentStatus.CREATED:
        return 'default';
      case PaymentStatus.FAILED:
        return 'red';
      case PaymentStatus.SETTLED:
        return 'lime';
      default:
        return 'default';
    }
  }
}
