import {Component, Input} from '@angular/core';

@Component({
  selector: 'zz-bootstrap-paginator',
  templateUrl: './bootstrap-paginator.component.html',
  styleUrls: ['./bootstrap-paginator.component.scss']
})
export class BootstrapPaginatorComponent
{
  @Input() rowsOnPageSet = [5, 10, 20];

  constructor() { }
}
