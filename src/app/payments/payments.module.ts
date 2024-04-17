import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

import { TableFiltersModule } from '@core/modules/table-filters';

import { PaymentsRoutingModule } from './payments-routing.module';

import { PaymentsComponent } from './components/payments/payments.component';
import { PaymentsContentComponent } from './components/payments-content/payments-content.component';
import { PaymentsTableComponent } from './components/payments-table/payments-table.component';

import { PaymentsPageComponent } from './containers/payments-page/payments-page.component';

import { StatusMapperPipe } from './pipes';

@NgModule({
  imports: [
    PaymentsRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
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
    PaymentsContentComponent,
    PaymentsTableComponent,
    PaymentsPageComponent,
    StatusMapperPipe,
  ],
})
export class PaymentsModule {}
