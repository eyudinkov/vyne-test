import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { TableFilterListComponent } from './components/table-filter-list/table-filter-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzRadioModule,
    NzMenuModule,
  ],
  declarations: [TableFilterListComponent],
  exports: [TableFilterListComponent],
})
export class TableFiltersModule {}
