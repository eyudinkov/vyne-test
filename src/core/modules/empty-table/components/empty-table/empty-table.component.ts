import { Component, Input } from '@angular/core';

@Component({
  selector: 'empty-table',
  templateUrl: './empty-table.component.html',
  styleUrls: ['./empty-table.component.scss'],
})
export class EmptyTableComponent {
  @Input() emptyText = 'Nothing to show here';
}
