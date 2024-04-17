import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsProviderModule } from '../icons-provider.module';

import { TopTableComponent } from './components/top-table/top-table.component';

@NgModule({
  imports: [CommonModule, IconsProviderModule],
  declarations: [TopTableComponent],
  exports: [TopTableComponent],
})
export class TopTableModule {}
