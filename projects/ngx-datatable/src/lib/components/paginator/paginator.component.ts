import {Component, OnInit, Optional} from '@angular/core';
import {Page, PageDirective} from '../../directives/page.directive';

@Component({
  selector: 'zz-paginator',
  template: `
    <ng-content></ng-content>`
})
export class PaginatorComponent implements OnInit
{

  pageInfo: Page;

  constructor(@Optional() public page: PageDirective)
  {
  }

  ngOnInit()
  {
    this.page.pageChange.subscribe(page => this.pageInfo = page);
    this.pageInfo = this.page.page;
  }


  public setPage(page: number): void
  {
    this.page.setPage(page, this.pageInfo.size);
  }

  public setRowsOnPage(size: number): void
  {
    this.page.setPage(this.pageInfo.page, size);
  }
}
