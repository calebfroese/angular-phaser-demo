import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

import { GameService } from '../services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('page') page: ElementRef;

  constructor(public service: GameService) {}

  ngAfterViewInit() {
    const { offsetWidth, offsetHeight } = this.page.nativeElement;
    this.service.init(offsetWidth, offsetHeight);
  }
}
