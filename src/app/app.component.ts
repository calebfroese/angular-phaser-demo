import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Phaser from 'phaser-ce/build/custom/phaser-split';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('page') page: ElementRef;
  @ViewChild('canvas') canvasEl: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('subtitle') subtitle: ElementRef;

  game: Phaser.Game;

  ngOnInit() {
    const { offsetWidth, offsetHeight } = this.page.nativeElement;
    this.game = new Phaser.Game(
      offsetWidth,
      offsetHeight,
      Phaser.AUTO,
      'content',
      {
        preload: this.preload,
        create: this.create,
      },
    );
  }

  preload() {
    this.game.load.image('logo', 'favicon.ico');
  }

  create() {
    var logo = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'logo',
    );
    logo.anchor.setTo(0.5, 0.5);
  }
}
