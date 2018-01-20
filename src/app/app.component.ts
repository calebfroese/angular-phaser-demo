import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AUTO, Game, Physics } from 'phaser-ce/build/custom/phaser-split';

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

  game: Game;
  platforms: any;
  player: any;

  ngOnInit() {
    const { offsetWidth, offsetHeight } = this.page.nativeElement;
    this.game = new Game(offsetWidth, offsetHeight, AUTO, 'content', {
      preload: this.preload,
      create: this.create,
      update: this.update,
    });
  }

  preload() {
    this.game.load.image('player', 'favicon.ico');
  }

  create() {
    this.game.physics.startSystem(Physics.ARCADE);

    const background = this.game.add.sprite(0, 0, 'background');
    // Platforms
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    const ground = this.platforms.create(50, this.game.world.height, 'ground');
    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
    //  Now let's create two ledges
    var ledge = this.platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = this.platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;
    // Plater
    this.player = this.game.add.sprite(32, 150, 'player');
    this.game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 2000;
    this.player.body.collideWorldBounds = true;
    this.game.stage.backgroundColor = 0xeeeeee;
  }

  update() {
    //  Collide the player with the platforms
    const hitPlatform = this.game.physics.arcade.collide(
      this.player,
      this.platforms,
    );
    const cursors = this.game.input.keyboard.createCursorKeys();
    this.player.body.velocity.x = 0;
    if (cursors.left.isDown) {
      this.player.body.velocity.x = -150;
    } else if (cursors.right.isDown) {
      this.player.body.velocity.x = 150;
    } else {
      this.player.animations.stop();
      this.player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    const isOnGround =
      this.player.y >= this.game.world.height - this.player.body.height;
    const isOnPlatform = this.player.body.touching.down && hitPlatform;
    if (cursors.up.isDown && (isOnGround || isOnPlatform)) {
      this.player.body.velocity.y = -1000;
    }
  }
}
