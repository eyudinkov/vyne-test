import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { ContentComponent } from './components/content/content.component';

@NgModule({
  imports: [CommonModule, NzLayoutModule],
  declarations: [ContentComponent],
  exports: [ContentComponent],
})
export class ContentModule {}
