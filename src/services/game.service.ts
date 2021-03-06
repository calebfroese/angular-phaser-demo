import { Injectable } from '@angular/core';
import { AUTO, Game, Physics } from 'phaser-ce/build/custom/phaser-split';

@Injectable()
export class GameService {
  // Game
  game: Game;
  platforms: any;
  player: any;

  public transitioning: boolean;

  init(width, height, callback) {
    this.game = new Game(
      width,
      height,
      AUTO,
      'content',
      {
        transparent: true,
        preload: phaser => this.preload.call(this),
        create: phaser => this.create.call(this, callback),
        update: phaser => this.update.call(this),
      },
      true,
    );
  }

  preload() {
    this.game.load.image('player', 'favicon.ico');
  }

  create(callback) {
    this.game.physics.startSystem(Physics.ARCADE);

    const background = this.game.add.sprite(
      window.innerWidth,
      window.innerWidth,
      'background',
    );
    // Platforms
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    // Plater
    this.player = this.game.add.sprite(32, 150, 'player');
    this.game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 1000;
    this.player.body.collideWorldBounds = true;

    callback();
  }

  update() {
    //  Collide the player with the platforms
    const hitPlatform = this.game.physics.arcade.collide(
      this.player,
      this.platforms,
    );
    const cursors = this.game.input.keyboard.createCursorKeys();
    this.player.body.velocity.x = 0;
    const PLAYER_SPEED = 750;
    const PLAYER_JUMP = 1000;
    if (cursors.left.isDown) {
      this.player.body.velocity.x = -PLAYER_SPEED;
    } else if (cursors.right.isDown) {
      this.player.body.velocity.x = PLAYER_SPEED;
    } else {
      this.player.animations.stop();
      this.player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    const isOnGround =
      this.player.y >= this.game.world.height - this.player.body.height;
    const isOnPlatform = this.player.body.touching.down && hitPlatform;
    if (cursors.up.isDown && (isOnGround || isOnPlatform)) {
      this.player.body.velocity.y = -PLAYER_JUMP;
    }

    if (!this.transitioning && this.player.y >= 1500) {
      // End transition and player no longer offscreen
      this.player.y = -50;
      this.player.body.velocity.y = 0;
      this.player.x = 100;
    } else if (!this.transitioning && this.player.y > 0) {
      // End transition and player no longer offscreen
      this.player.body.collideWorldBounds = true;
    } else if (this.transitioning) {
      // Start transition
      this.player.body.collideWorldBounds = false;
    }
  }

  createCollidable({ name, x, y, width, height }: any) {
    const obj = this.platforms.create(x, y, 'player');
    obj.name = name;
    obj.width = width;
    obj.height = height;
    obj.body.immovable = true;
    return obj;
  }

  removeCollider(collider: any) {
    this.platforms.removeChild(collider);
  }
}
