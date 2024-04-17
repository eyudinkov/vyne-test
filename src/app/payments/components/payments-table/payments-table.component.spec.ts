import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { PaymentsComponent } from '../payments/payments.component';
import { PaymentsPageComponent } from '../../containers/payments-page/payments-page.component';

import { PaymentsContentComponent } from '../payments-content/payments-content.component';
import { PaymentsTableComponent } from './payments-table.component';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCER, metaReducers } from '@core/state/reducers';

import { EffectsModule } from '@ngrx/effects';
import { AuthEffects, PaymentsEffects } from '@core/state/effects';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  NzDatePickerModule,
  NzDatePickerComponent,
} from 'ng-zorro-antd/date-picker';
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
import { startOfDay, endOfDay, format } from 'date-fns';

import { PaymentStatus } from '@core/state/models/payments';

import { EventTarget, EventName } from '../../interfaces';

describe('PaymentsTableComponent', () => {
  let component: PaymentsTableComponent;
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
        PaymentsTableComponent,
        PaymentsContentComponent,
      ],
      providers: [EventBusService],
    }).compileComponents();

    eventBusService = TestBed.inject(EventBusService);

    const fixture = TestBed.createComponent(PaymentsTableComponent);
    component = fixture.componentInstance;

    const fixtureDatePicker = TestBed.createComponent(NzDatePickerComponent);
    const componentDatePicker = fixtureDatePicker.componentInstance;

    component.datePicker = componentDatePicker;

    jest.spyOn(eventBusService, 'emit');
  });

  describe('Event emissions', () => {
    it('should emit event when changeTable is called', () => {
      component.changeTable();
      expect(eventBusService.emit).toHaveBeenCalled();
    });

    it('should emit event with correct params when changeTable is called', () => {
      component.changeTable();
      expect(eventBusService.emit).toHaveBeenCalledWith({
        target: EventTarget.PAYMENTS_PAGE,
        name: EventName.LOAD_REPORT_TABLE,
        data: {
          page: component.tableParams.currentPage,
          size: component.tableParams.pageSize,
          createdAtStart: component.filterDate
            ? format(startOfDay(component.filterDate[0]), 'yyyy-MM-dd')
            : null,
          createdAtEnd: component.filterDate
            ? format(endOfDay(component.filterDate[1]), 'yyyy-MM-dd')
            : null,
          status: component.tableParams.filter['status']?.[0] || null,
        },
      });
    });
  });

  describe('Filter manipulations', () => {
    it('should update filter when changeFilter is called', () => {
      component.activeFilterKey = 'status';
      component.changeFilter([PaymentStatus.CAPTURED]);
      expect(component.tableParams.filter['status']).toEqual([
        PaymentStatus.CAPTURED,
      ]);
    });

    it('should reset filter when resetFilter is called', () => {
      component.activeFilterKey = 'status';
      component.tableParams.filter['status'] = [PaymentStatus.CAPTURED];
      component.resetFilter();
      expect(component.tableParams.filter['status']).toBeUndefined();
    });

    it('should update date filter when changeDateFilter is called', () => {
      const date = new Date();
      component.changeDateFilter([date, date]);
      expect(component.filterDate).toEqual([date, date]);
    });

    it('should reset date filter when resetDateFilter is called', () => {
      const date = new Date();
      component.filterDate = [date, date];
      component.resetDateFilter();
      expect(component.filterDate).toBeNull();
    });

    it('should apply filter when applyFilter is called', () => {
      const changeTableSpy = jest.spyOn(component, 'changeTable');
      component.applyFilter();
      expect(changeTableSpy).toHaveBeenCalled();
    });

    it('should change filter visibility when changeFilterVisibility is called', () => {
      component.changeFilterVisibility('status', true);
      expect(component.activeFilterKey).toEqual('status');
      expect(component.isFilterDropdownVisible).toEqual(true);
    });

    it('should apply date filter when applyDateFilter is called', () => {
      const changeTableSpy = jest.spyOn(component, 'changeTable');
      component.applyDateFilter();
      expect(changeTableSpy).toHaveBeenCalled();
    });
  });

  describe('Pagination manipulations', () => {
    it('should change current page when changeCurrentPage is called', () => {
      const newPage = 2;
      jest.spyOn(component, 'changeTable');
      component.changeCurrentPage(newPage);
      expect(component.tableParams.currentPage).toEqual(newPage - 1);
      expect(component.changeTable).toHaveBeenCalled();
    });
  });
});
