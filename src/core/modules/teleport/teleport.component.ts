import { Component, Attribute, Input, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { TeleportService } from './teleport.service';

@Component({
  selector: 'wm-teleport',
  template: '<ng-container *ngTemplateOutlet="template$ | async; context: context"></ng-container>',
})
export class TeleportComponent {
  @Input() context: object | null = null;

  readonly template$: Observable<TemplateRef<object | null> | null>;

  constructor(@Attribute('name') name: string, private teleport: TeleportService) {
    this.template$ = this.teleport.pipe(
      filter((instance) => !instance || name in instance),
      map((instance) => instance && instance[name])
    );
  }
}
