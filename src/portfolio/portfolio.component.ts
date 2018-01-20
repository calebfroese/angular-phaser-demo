import { Component } from '@angular/core';
import { routerTransition } from '../animations';

@Component({
  selector: 'cf-portfolio',
  animations: [routerTransition()],
  templateUrl: './portfolio.component.html',
  host: { '[@routerTransition]': '' },
})
export class PortfolioComponent {}
