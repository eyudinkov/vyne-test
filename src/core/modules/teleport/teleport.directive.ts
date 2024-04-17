import {
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';

import { TeleportService } from './teleport.service';

import { isDefined } from '@core/utils';

@Directive({
  selector: 'ng-template[wmTeleport]',
})
export class TeleportDirective implements OnChanges, OnDestroy {
  @Input() wmTeleport!: string;

  constructor(
    private teleport: TeleportService,
    private template: TemplateRef<any>
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const target = changes['wmTeleport'];

    if (!target) {
      return;
    }

    if (isDefined(target.previousValue)) {
      this.teleport.clear(target.previousValue);
    }

    if (isDefined(target.currentValue)) {
      this.teleport.activate(target.currentValue, this.template);
    }
  }

  ngOnDestroy() {
    if (isDefined(this.wmTeleport)) {
      this.teleport.clear(this.wmTeleport);
    }
  }
}
