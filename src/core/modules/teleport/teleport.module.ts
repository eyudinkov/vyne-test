import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeleportComponent } from './teleport.component';
import { TeleportDirective } from './teleport.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TeleportComponent, TeleportDirective],
  exports: [TeleportComponent, TeleportDirective],
})
export class TeleportModule {}
