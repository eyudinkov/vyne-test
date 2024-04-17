import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzTableSortOrder, NzTableSortFn } from 'ng-zorro-antd/table';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { startOfDay, endOfDay, format } from 'date-fns';

import { isDefined, omit } from '@core/utils';
import { EventBusService, UnsubscribeService } from '@core/services';
import { Payment, PaymentStatus, Filter } from '@core/state/models/payments';

import { EventTarget, EventName } from '../../interfaces';

interface Column {
  title: string;
  key: string;
  sortOrder?: NzTableSortOrder | null | undefined;
  sortFn?: NzTableSortFn | null;
  width?: number;
}

@Component({
  selector: 'payments-table',
  templateUrl: './payments-table.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [UnsubscribeService],
})
export class PaymentsTableComponent {
  @Input() loading!: boolean | null;
  @Input() list: Payment[] | undefined = [];
  @Input() total: number | undefined = 0;
  @ViewChild('datePicker') datePicker!: NzDatePickerComponent;

  filterList: {
    [key: string]: Filter[];
  } = {
    status: Object.keys(PaymentStatus).map((key) => ({
      text: key,
      value: key,
      checked: false,
    })),
  };
  activeFilterKey: string | null = null;
  isFilterDropdownVisible: boolean = false;
  isFilterDateDropdownVisible = false;
  filterDate: Date[] | null = null;
  tableParams = {
    pageSize: 5,
    currentPage: 0,
    filter: {} as {
      [propName: string]: string[] | string | null;
    },
  };
  columns: Column[] = [
    {
      title: 'ID',
      key: 'id',
      width: 200,
    },
    {
      title: 'Amount',
      key: 'amount',
      width: 150,
      sortOrder: null,
      sortFn: ((a: Payment, b: Payment) =>
        a.amount - b.amount) as NzTableSortFn,
    },
    {
      title: 'Description',
      key: 'description',
      width: 250,
      sortOrder: null,
      sortFn: ((a: Payment, b: Payment) =>
        a.description.localeCompare(b.description)) as NzTableSortFn,
    },
    {
      title: 'Status',
      key: 'status',
      width: 250,
    },
    {
      title: 'Created At',
      key: 'createdAt',
      width: 220,
      sortOrder: null,
      sortFn: ((a: Payment, b: Payment) =>
        a.createdAt.localeCompare(b.createdAt)) as NzTableSortFn,
    },
  ];

  constructor(private eventBusService: EventBusService) {}

  applyFilter(): void {
    this.isFilterDropdownVisible = false;
    this.tableParams.currentPage = 0;
    this.changeTable();
  }

  changeFilterVisibility(key: string, open: boolean): void {
    this.activeFilterKey = key;
    this.isFilterDropdownVisible = open;

    if (!this.isFilterDropdownVisible) {
      this.changeTable();
    }
  }

  resetFilter(): void {
    if (isDefined(this.activeFilterKey)) {
      this.tableParams = {
        ...this.tableParams,
        filter: omit(this.tableParams?.filter || {}, this.activeFilterKey) as {
          [propName: string]: string[] | string | null;
        },
      };
      if (this.filterList[this.activeFilterKey]) {
        this.filterList = {
          ...this.filterList,
          [this.activeFilterKey]: this.filterList[this.activeFilterKey].map(
            (el) => ({
              ...el,
              checked: false,
            })
          ),
        };
      }
      this.isFilterDropdownVisible = false;
      this.tableParams.currentPage = 0;
      this.changeTable();
    }
  }

  changeDateFilterVisibility(visible: boolean): void {
    this.isFilterDateDropdownVisible = visible;
    if (visible) {
      this.datePicker.open();
    } else {
      this.datePicker.close();
    }
  }

  changeDateFilter(dates: Date[]): void {
    this.filterDate = dates;
    this.changeDateFilterVisibility(false);
    this.datePicker.close();
    this.tableParams.currentPage = 0;
    this.changeTable();
  }

  resetDateFilter(): void {
    this.changeDateFilterVisibility(false);
    this.datePicker.close();
    this.filterDate = null;
    this.tableParams.currentPage = 0;
    this.changeTable();
  }

  applyDateFilter(): void {
    this.changeDateFilterVisibility(false);
    this.datePicker.close();
    this.tableParams.currentPage = 0;
    this.changeTable();
  }

  changeFilter(filterData: string[]): void {
    if (isDefined(this.activeFilterKey)) {
      this.tableParams = {
        ...this.tableParams,
        filter: filterData.length
          ? {
              ...(this.tableParams?.filter || {}),
              [this.activeFilterKey]: filterData,
            }
          : omit(this.tableParams?.filter || {}, this.activeFilterKey),
      };

      if (this.filterList[this.activeFilterKey]) {
        this.filterList = {
          ...this.filterList,
          [this.activeFilterKey]: this.filterList[this.activeFilterKey].map(
            (el) => ({
              ...el,
              checked: filterData.includes(el.value),
            })
          ),
        };
      }
    }
  }

  changeCurrentPage(newPage: number): void {
    this.tableParams.currentPage = newPage - 1;
    this.changeTable();
  }

  changeTable(): void {
    const params = {
      page: this.tableParams.currentPage,
      size: this.tableParams.pageSize,
      createdAtStart: this.filterDate
        ? format(startOfDay(this.filterDate[0]), 'yyyy-MM-dd')
        : null,
      createdAtEnd: this.filterDate
        ? format(endOfDay(this.filterDate[1]), 'yyyy-MM-dd')
        : null,
      status: this.tableParams.filter['status']?.[0] || null,
    };

    this.eventBusService.emit({
      target: EventTarget.PAYMENTS_PAGE,
      name: EventName.LOAD_REPORT_TABLE,
      data: params,
    });
  }
}
