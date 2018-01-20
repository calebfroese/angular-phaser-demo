import { Injectable } from '@angular/core';
import { AUTO, Game, Physics } from 'phaser-ce/build/custom/phaser-split';

@Injectable()
export class GameService {
  // Collidables
  collidables: any[] = [];
  // Game
  game: Game;
  platforms: any;
  player: any;

  init(width, height) {
    this.game = new Game(width, height, AUTO, 'content', {
      preload: phaser => this.preload.call(this),
      create: phaser => this.create.call(this),
      update: phaser => this.update.call(this),
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
    this.collidables.forEach(({ x, y, width, height }: any) => {
      const obj = this.platforms.create(x, y, 'player');
      obj.width = width;
      obj.height = height;
      obj.body.immovable = true;
    });
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

  registerCollidable(data: any) {
    this.collidables.push(data);
  }
}