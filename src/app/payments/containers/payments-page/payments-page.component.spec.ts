import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PaymentsComponent } from '../../components/payments/payments.component';
import { PaymentsTableComponent } from '../../components/payments-table/payments-table.component';

import { PaymentsContentComponent } from '../../components/payments-content/payments-content.component';
import { PaymentsPageComponent } from './payments-page.component';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { ROOT_REDUCER, metaReducers } from '@core/state/reducers';

import { EffectsModule } from '@ngrx/effects';
import { AuthEffects, PaymentsEffects } from '@core/state/effects';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MainLayoutModule } from '@core/modules/main-layout';
import { ContentModule } from '@core/modules/content';
import { TopTableModule } from '@core/modules/top-table';
import { IconsProviderModule } from '@core/modules/icons-provider.module';
import { TeleportModule } from '@core/modules/teleport';
import { EmptyTableModule } from '@core/modules/empty-table';
import { EventBusService } from '@core/services';
import { TableFiltersModule } from '@core/modules/table-filters';

import { PaymentActions } from '@core/state/actions/payments';
import { LoginActions } from '@core/state/actions/auth';

import { Params } from '@core/state/models/params';

import { EventTarget, EventName } from '../../interfaces';

describe('PaymentsPageComponent', () => {
  let fixture: ComponentFixture<PaymentsPageComponent>;
  let component: PaymentsPageComponent;
  let eventBusService: EventBusService;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule,
        StoreModule.forRoot(ROOT_REDUCER, {
          metaReducers,
        }),
        EffectsModule.forRoot([PaymentsEffects, AuthEffects]),
        HttpClientModule,
        MainLayoutModule,
        NzGridModule,
        ContentModule,
        NzDropDownModule,
        NzButtonModule,
        NzDatePickerModule,
        NzTagModule,
        NzTableModule,
        TopTableModule,
        EmptyTableModule,
        TeleportModule,
        IconsProviderModule,
        TableFiltersModule,
        FormsModule,
      ],
      declarations: [
        PaymentsComponent,
        PaymentsPageComponent,
        PaymentsTableComponent,
        PaymentsContentComponent,
      ],
      providers: [EventBusService],
    }).compileComponents();

    store = TestBed.inject(Store);
    eventBusService = TestBed.inject(EventBusService);

    fixture = TestBed.createComponent(PaymentsPageComponent);
    component = fixture.componentInstance;

    jest.spyOn(store, 'dispatch');
    jest.spyOn(eventBusService, 'emit');
  });

  it('should dispatch LOAD_REPORT_TABLE event on init', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(eventBusService.emit).toHaveBeenCalledWith({
      target: EventTarget.PAYMENTS_PAGE,
      name: EventName.LOAD_REPORT_TABLE,
      data: {},
    });
  });

  it('should dispatch getPayments action when LOAD_REPORT_TABLE event is received', () => {
    const eventData = { name: EventName.LOAD_REPORT_TABLE, data: {} as Params };
    component.event(eventData);
    expect(store.dispatch).toHaveBeenCalledWith(
      PaymentActions.getPayments({ payload: eventData.data })
    );
  });

  it('should dispatch logout action when LOGOUT event is received', () => {
    const eventData = { name: EventName.LOGOUT };
    component.event(eventData);
    expect(store.dispatch).toHaveBeenCalledWith(LoginActions.logout());
  });

  it('should not dispatch any action when an unknown event is received', () => {
    const eventData = { name: 'UNKNOWN_EVENT' };
    component.event(eventData);
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
