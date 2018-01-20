import {
  QueryList,
  ViewChildren,
  HostListener,
  OnInit,
  Component,
} from '@angular/core';

import { routerTransition } from '../animations';
import { GameService } from '../services/game.service';
import { CollidableDirective } from '../directives/collidable.directive';

@Component({
  selector: 'cf-home',
  animations: [routerTransition()],
  templateUrl: './home.component.html',
  host: {
    '[@routerTransition]': '',
  },
})
export class HomeComponent implements OnInit {
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
