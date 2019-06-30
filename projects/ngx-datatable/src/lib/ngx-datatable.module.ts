import {NgModule} from '@angular/core';
import {PaginatorComponent} from './components/paginator/paginator.component';
import {BootstrapPaginatorComponent} from './components/bootstrap-paginator/bootstrap-paginator.component';
import {CommonModule} from '@angular/common';
import {PageDirective} from './directives/page.directive';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { SorterComponent } from './components/sorter/sorter.component';

const comp = [PageDirective, PaginatorComponent, BootstrapPaginatorComponent];

@NgModule({
  declarations: [...comp, SorterComponent],
  imports: [CommonModule, NgbPaginationModule],
  exports: [...comp, SorterComponent]
})
export class NgxDatatableModule {}
