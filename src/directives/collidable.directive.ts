import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

import { GameService } from '../services/game.service';

@Directive({
  selector: '[collide]',
})
export class CollidableDirective implements OnInit, OnDestroy {
  // Reference to the collider game object
  obj: any;
  exists: boolean;

  constructor(public service: GameService, private el: ElementRef) {}

  destroy() {
    this.service.removeCollider(this.obj);
  }

  create() {
    const {
      left: x,
      top: y,
      width,
      height,
    } = this.el.nativeElement.getBoundingClientRect();
    this.obj = this.service.createCollidable({ x, y: y, width, height });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.exists = false;
  }
}
