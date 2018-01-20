import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { GameService } from '../services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('page') page: ElementRef;
  loaded: boolean;

  constructor(public service: GameService) {}

  ngOnInit() {
    const { offsetWidth, offsetHeight } = this.page.nativeElement;
    this.service.init(offsetWidth, offsetHeight, () => (this.loaded = true));
  }
}
