import { Directive, ElementRef, OnInit } from '@angular/core';

import { GameService } from '../services/game.service';

@Directive({
  selector: '[collide]',
})
export class CollidableDirective implements OnInit {
  constructor(public service: GameService, private el: ElementRef) {}

  ngOnInit() {
    const {
      left: x,
      top: y,
      width,
      height,
    } = this.el.nativeElement.getBoundingClientRect();
    this.service.registerCollidable({ x, y, width, height });
  }
}
