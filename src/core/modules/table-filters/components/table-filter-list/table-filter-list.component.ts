import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Filter } from '@core/state/models/payments';

@Component({
  selector: 'table-filter-list',
  templateUrl: './table-filter-list.component.html',
  styleUrls: ['./table-filter-list.component.scss'],
})
export class TableFilterListComponent {
  @Input()
  set list(value: Filter[]) {
    this._list = value;
    this.haveCheckedItems = this._list
      ? this._list.some((el) => el?.checked)
      : false;
  }
  get list(): Filter[] {
    return this._list;
  }

  @Output() filterChanged = new EventEmitter<string[]>();
  @Output() resetSearch = new EventEmitter();
  @Output() searchValue = new EventEmitter();

  _list: Filter[] = [];
  haveCheckedItems = false;

  trackByValue(_: number, item: Filter): string {
    return item.value;
  }

  select(item: Filter): void {
    this.filterChanged.emit(item?.checked ? [] : [item.value]);
  }

  reset(): void {
    this.resetSearch.emit();
  }

  handlerSearch(): void {
    this.searchValue.emit();
  }
}
