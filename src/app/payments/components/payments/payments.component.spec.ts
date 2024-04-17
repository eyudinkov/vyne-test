import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { PaymentsComponent } from './payments.component';
import { PaymentsPageComponent } from '../../containers/payments-page/payments-page.component';

import { PaymentsContentComponent } from '../payments-content/payments-content.component';
import { PaymentsTableComponent } from '../payments-table/payments-table.component';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
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

import { EventTarget, EventName } from '../../interfaces';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let eventBusService: EventBusService;

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
      ],
      declarations: [
        PaymentsComponent,
        PaymentsPageComponent,
        PaymentsContentComponent,
        PaymentsTableComponent,
      ],
      providers: [EventBusService],
    }).compileComponents();

    eventBusService = TestBed.inject(EventBusService);

    const fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;

    jest.spyOn(eventBusService, 'emit');
  });

  describe('Validate event', () => {
    it('Should call eventBusService.emit method', () => {
      component.logout();
      expect(eventBusService.emit).toHaveBeenCalledWith({
        target: EventTarget.PAYMENTS_PAGE,
        name: EventName.LOGOUT,
      });
    });
  });
});
