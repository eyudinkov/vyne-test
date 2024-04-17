import { TestBed } from '@angular/core/testing';

import { LoginComponent } from '../../components/login/login.component';
import { LoginPageComponent } from './login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { ROOT_REDUCER, metaReducers } from '@core/state/reducers';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { WrapperFormComponent } from '../../components/wrapper-form/wrapper-form.component';
import { EventBusService } from '@core/services';

import { LoginActions } from 'core/state/actions/auth';

describe('LoginPageComponent', () => {
  let loginComponent: LoginComponent;
  let loginPageComponent: LoginPageComponent;

  let store: Store;
  let eventBusService: EventBusService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(ROOT_REDUCER, {
          metaReducers,
        }),
        HttpClientModule,
        NzFormModule,
        NzButtonModule,
        NzInputModule,
        NzIconModule,
        NzLayoutModule,
        NzCardModule,
      ],
      declarations: [LoginPageComponent, LoginComponent, WrapperFormComponent],
      providers: [EventBusService],
    }).compileComponents();

    store = TestBed.inject(Store);
    eventBusService = TestBed.inject(EventBusService);

    const loginFixture = TestBed.createComponent(LoginComponent);
    loginComponent = loginFixture.componentInstance;

    const loginPageFixture = TestBed.createComponent(LoginPageComponent);
    loginPageComponent = loginPageFixture.componentInstance;

    jest.spyOn(store, 'dispatch');
  });

  describe('Validate event', () => {
    it('Should dispatch login action', () => {
      const payload = {
        login: 'user',
        password: 'userPass',
      };

      loginComponent.form.patchValue(payload);
      loginComponent.submit();

      expect(store.dispatch).toHaveBeenCalledWith(
        LoginActions.login({ payload })
      );
    });

    it('Should ignore unknown event', () => {
      eventBusService.emit({
        target: 'UNKNOWN_TARGET',
        name: 'UNKNOWN_EVENT',
      });

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
