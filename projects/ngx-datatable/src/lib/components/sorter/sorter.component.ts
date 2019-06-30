import {Component, Input, OnInit} from '@angular/core';
import {PageDirective} from '../../directives/page.directive';

@Component({
  selector: 'zz-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
export class SorterComponent implements OnInit
{

  @Input() by: string;
  sortBy: string | 'asc' | 'desc' | '';


  constructor(private page: PageDirective) { }

  ngOnInit()
  {
    this.page.sortChange.subscribe(sort => {
      console.error('bbb', this.by, sort.toString());
      const index = this.page.sort.indexOf(this.by);
      if (index !== -1 && this.page.sort.length > index + 1) {
        this.sortBy = this.page.sort[index + 1];
        console.error('ccc', this.by, this.sortBy);
      } else {
        this.sortBy = '';
      }
    });
  }

  sort()
  {
    const sort = ['asc', 'desc', ''];
    this.sortBy = sort[(sort.indexOf(this.sortBy) + 1) % 3];
    this.page.setSort(this.by, this.sortBy);
  }
}
