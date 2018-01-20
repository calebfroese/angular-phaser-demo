import { Component } from '@angular/core';
import { routerTransition } from '../animations';

@Component({
  selector: 'cf-home',
  animations: [routerTransition()],
  templateUrl: './home.component.html',
  host: { '[@routerTransition]': '' },
})
export class HomeComponent {}
