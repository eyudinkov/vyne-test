import { Component, Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { EventBusService } from '@core/services';

import { Error } from '@core/state/models/error';

import { EventName, EventTarget } from '../../interfaces';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    '../wrapper-form/wrapper-form.component.scss',
  ],
})
export class LoginComponent {
  @Input() requestLoadingStatus!: boolean | null;
  @Input() error!: Error | null;

  constructor(private eventBusService: EventBusService) {}

  passwordVisible = false;
  form = new FormGroup({
    login: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required],
    }),
  });

  submit(): void {
    if (this.form.valid) {
      this.eventBusService.emit({
        target: EventTarget.AUTH,
        name: EventName.LOGIN,
        data: this.form.value,
      });
    } else {
      for (const key of Object.keys(this.form.controls)) {
        this.form.controls[
          key as keyof typeof this.form.controls
        ].markAsDirty();
        this.form.controls[
          key as keyof typeof this.form.controls
        ].updateValueAndValidity();
      }
    }
  }
}
