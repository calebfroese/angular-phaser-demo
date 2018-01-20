import { Directive, ElementRef, OnDestroy } from '@angular/core';

import { GameService } from '../services/game.service';

@Directive({
  selector: '[collide]',
})
export class CollidableDirective implements OnDestroy {
  // Reference to the collider game object
  obj: any;

  constructor(public service: GameService, private el: ElementRef) {}

  transitionLevel() {}

  transitionEnd() {
    const {
      left: x,
      top: y,
      width,
      height,
    } = this.el.nativeElement.getBoundingClientRect();
    this.obj = this.service.registerCollidable({ x, y: y, width, height });
  }

  ngOnDestroy() {
    this.service.removeCollider(this.obj);
  }
}
