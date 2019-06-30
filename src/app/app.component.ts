import {Component} from '@angular/core';
import {Page} from '../../projects/ngx-datatable/src/lib/directives/page.directive';
import {DATA} from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'ngx-pagedata-lib';

  data = DATA;
}
