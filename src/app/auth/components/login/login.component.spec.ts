import { TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { WrapperFormComponent } from '../wrapper-form/wrapper-form.component';
import { EventBusService } from '@core/services';

import { EventTarget, EventName } from '../../interfaces';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let eventBusService: EventBusService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NzFormModule,
        NzButtonModule,
        NzInputModule,
        NzIconModule,
        NzLayoutModule,
        NzCardModule,
      ],
      declarations: [LoginComponent, WrapperFormComponent],
      providers: [EventBusService],
    }).compileComponents();

    eventBusService = TestBed.inject(EventBusService);

    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    jest.spyOn(eventBusService, 'emit');
  });

  describe('Validate login', () => {
    it('Should set invalid to true when login is empty', () => {
      const login = component.form.controls.login;
      expect(login.invalid).toBeTruthy();
    });

    it('Should set invalid to false when login is not empty', () => {
      const login = component.form.controls.login;
      login.patchValue('user');
      expect(login.invalid).toBeFalsy();
    });
  });

  describe('Validate password', () => {
    it('Should set invalid to true when password is empty', () => {
      const password = component.form.controls.password;
      expect(password.invalid).toBeTruthy();
    });

    it('Should set invalid to false when password is not empty', () => {
      const password = component.form.controls.password;
      password.patchValue('userPass');
      expect(password.invalid).toBeFalsy();
    });
  });

  describe('Validate form', () => {
    it('Should set invalid to true when form is empty', () => {
      expect(component.form.invalid).toBeTruthy();
    });

    it('Should set invalid to false when form is not empty', () => {
      component.form.controls.login.patchValue('user');
      component.form.controls.password.patchValue('userPass');
      expect(component.form.invalid).toBeFalsy();
    });

    it('Should emit LOGIN event when form is valid', () => {
      component.form.controls.login.patchValue('user');
      component.form.controls.password.patchValue('userPass');
      component.submit();
      expect(eventBusService.emit).toHaveBeenCalledWith({
        target: EventTarget.AUTH,
        name: EventName.LOGIN,
        data: {
          login: 'user',
          password: 'userPass',
        },
      });
    });
  });
});
