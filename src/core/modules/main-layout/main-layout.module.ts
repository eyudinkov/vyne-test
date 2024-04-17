import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { IconsProviderModule } from '../icons-provider.module';

import { TeleportModule } from '../teleport';

import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MainLayoutComponent } from './containers/main-layout/main-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzAvatarModule,
    TeleportModule,
    NzSpinModule,
    IconsProviderModule,
  ],
  declarations: [HeaderComponent, LayoutComponent, MainLayoutComponent],
  exports: [MainLayoutComponent],
})
export class MainLayoutModule {}
