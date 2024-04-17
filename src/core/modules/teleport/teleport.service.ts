import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TeleportInstance {
  [target: string]: TemplateRef<object | null> | null;
}

@Injectable({
  providedIn: 'root',
})
export class TeleportService extends BehaviorSubject<TeleportInstance | null> {
  constructor() {
    super(null);
  }

  public activate(target: string, template: TemplateRef<object | null>) {
    this.next({
      [target]: template,
    });
  }

  public clear(target: string) {
    this.next({
      [target]: null,
    });
  }

  public clearAll() {
    this.next(null);
  }
}
