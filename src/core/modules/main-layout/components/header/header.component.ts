import { Component } from '@angular/core';

import { EventBusService } from '@core/services';

import { EventName, EventTarget } from '../../interfaces';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private eventBusService: EventBusService) {}

  logout(): void {
    this.eventBusService.emit({
      target: EventTarget.LAYOUT,
      name: EventName.LOGOUT,
    });
  }
}
