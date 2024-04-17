import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

import { EmptyTableComponent } from './components/empty-table/empty-table.component';

@NgModule({
  imports: [CommonModule, NzEmptyModule],
  declarations: [EmptyTableComponent],
  exports: [EmptyTableComponent],
})
export class EmptyTableModule {}
