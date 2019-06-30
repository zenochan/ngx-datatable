import {Directive, EventEmitter, Input, IterableDiffer, IterableDiffers, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Page
{
  page: number;
  size: number;
  total: number;
  sort?: string[];
}

@Directive({
  selector: '[zzPage]',
  exportAs: 'page'
})
export class PageDirective implements OnInit
{
  private diff: IterableDiffer<any>;

  public page: Page = {page: 1, size: 10, total: 0};
  public sort = [];

  private allData: any[];
  private pageData: any[];

  @Input()
  public set data(data: any[])
  {
    this.allData = data;
    this.page.total = data.length;
    this.fillData();
  }

  public get data()
  {
    return this.pageData;
  }

  @Input()
  public set zzPage(page: Page)
  {
    if (!page) {
      return;
    }

    this.page = page;
    this.pageChange.emit(page);
  }

  @Output() public pageChange = new EventEmitter<Page>();
  sortChange = new BehaviorSubject(this.sort);

  private mustRecalculateData = false;

  public constructor(private differs: IterableDiffers)
  {
    this.diff = differs.find([]).create(null);
  }

  ngOnInit(): void
  {
    this.pageChange.subscribe(res => {
      if (this.allData) {
        this.fillData();
      }
    });
  }

  public setPage(page: number, size: number): void
  {
    if (this.page.size !== size || this.page.page !== page) {
      this.page.page = this.page.page !== page ? page : this.calculateNewActivePage(this.page.size, size);
      this.page.size = size;
      this.mustRecalculateData = true;

      this.page.sort = this.sort;
      this.pageChange.emit(this.page);
    }
  }

  private calculateNewActivePage(previousRowsOnPage: number, currentRowsOnPage: number): number
  {
    const firstRowOnPage = (this.page.page - 1) * previousRowsOnPage + 1;
    return Math.ceil(firstRowOnPage / currentRowsOnPage);
  }

  setSort(name: string, sort: string | 'asc' | 'desc' | '' | null = '')
  {
    const index = this.sort.indexOf(name);
    if (index === -1) {
      this.sort.push(name, sort || 'asc');
    }

    if (index !== -1 && this.sort.length > index + 1) {
      if (sort === 'asc' || sort === 'desc') {
        this.sort.splice(index + 1, 1, sort);
      } else {
        this.sort.splice(index, 2);
      }
    }

    this.page.sort = this.sort;
    this.pageChange.emit(this.page);
  }

  private fillData(): void
  {
    const lastPage = Math.ceil(this.allData.length / this.page.size);
    this.page.page = lastPage < this.page.page ? lastPage : this.page.page;
    this.page.page = this.page.page || 1;


    const offset = (this.page.page - 1) * this.page.size;
    let data = this.allData;
    const sortBy = this.sort;

    if (sortBy.length > 0) {
      this.sort = this.sort.slice(sortBy.length - 2);
      this.sortChange.next(this.sort);
      data = new Array(...data).sort((a, b) => {
        const delta = a[this.sort[0]] >= b[this.sort[0]];
        return this.sort[1] === 'asc' && delta ? 0 : -1;
      });
    }

    this.pageData = data.slice(offset, offset + this.page.size);
  }
}
