import {
  QueryList,
  ViewChildren,
  HostListener,
  OnInit,
  OnDestroy,
  Component,
} from '@angular/core';

import { animations } from '../animations';
import { GameService } from '../services/game.service';
import { CollidableDirective } from '../directives/collidable.directive';

@Component({
  selector: 'cf-home',
  animations: animations(),
  templateUrl: './home.component.html',
  host: {
    '[@routerTransition]': '',
    '[@enter]': '',
    '[@leave]': '',
  },
})
export class HomeComponent implements OnInit, OnDestroy {
  destroying: boolean;
  @HostListener('@enter.done')
  animStart() {
    if (this.destroying) return;
    this.service.transitioning = false;
    if (this.collidables.length)
      this.collidables.forEach(collidable => collidable.create());
  }
  @ViewChildren(CollidableDirective)
  collidables: QueryList<CollidableDirective>;

  constructor(public service: GameService) {}

  ngOnInit() {}
  ngOnDestroy() {
    this.service.transitioning = true;
    this.destroying = true;
    if (this.collidables.length)
      this.collidables.forEach(collidable => collidable.destroy());
  }
}
