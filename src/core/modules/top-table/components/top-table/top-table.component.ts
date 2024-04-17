import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'top-table',
  templateUrl: './top-table.component.html',
  styleUrls: ['./top-table.component.scss'],
})
export class TopTableComponent {
  @Input() content: TemplateRef<any> | null = null;
  @Input() total: string | number | undefined = '';
  @Input()
  set totalText(value: string | TemplateRef<any>) {
    this.totalTemplate = value instanceof TemplateRef ? value : null;
    this.totalString = !(value instanceof TemplateRef)
      ? value
      : this.totalString;
  }
  @Input() loading: boolean | null = false;
  @Input() className = '';

  totalString = 'Total:';
  totalTemplate: TemplateRef<any> | null = null;
}
