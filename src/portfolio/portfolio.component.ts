import {
  Component,
  HostListener,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { routerTransition } from '../animations';
import { CollidableDirective } from '../directives/collidable.directive';
import { GameService } from '../services/game.service';

@Component({
  selector: 'cf-portfolio',
  animations: [routerTransition()],
  templateUrl: './portfolio.component.html',
  host: { '[@routerTransition]': '' },
})
export class PortfolioComponent {
  @HostListener('@routerTransition.start')
  animStart() {
    if (this.collidables.length)
      this.collidables.forEach(collidable => collidable.transitionLevel());
  }
  @HostListener('@routerTransition.done')
  animDone() {
    if (this.collidables.length)
      this.collidables.forEach(collidable => collidable.transitionEnd());
  }
  @ViewChildren(CollidableDirective)
  collidables: QueryList<CollidableDirective>;

  constructor(public service: GameService) {}

  ngOnInit() {}
}
