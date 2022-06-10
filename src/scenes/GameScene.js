import {Scene} from 'phaser';
import Entity from "../entity/Entity";

class GameScene extends Scene {
    constructor() {
        super("scene-game");
    }

    create() {
        // Add, scale, and make up a speed for our creature
        this.player = new Entity(this, 10, 10, 'main-character');
        // this.player = this.physics.add.sprite(10, 10, 'main-character');
        this.player = this.physics.add.existing(this.player);
        this.playerSpeed = 300;
        // Create a helper object for our arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // Coin things
        const coins = this.physics.add.group();
        coins.create(200, 200, "coin");
        coins.create(400, 400, "coin");
        coins.create(400, 200, "coin");
        coins.create(500, 570, "coin");
        coins.create(500, 100, "coin");
        coins.create(100, 550, "coin");

        this.physics.add.overlap(this.player, coins, this.collidePlayerCoin);
    }

    update(time, delta) {
        // Listen for keyboard input
        const {left, right, up, down} = this.cursors;
        if (left.isDown) {
            this.player.setVelocityX(-this.playerSpeed);
        }
        else if (right.isDown) {
            this.player.setVelocityX(this.playerSpeed);
        }
        else {
            this.player.setVelocityX(0);
        }
        if (up.isDown) {
            this.player.setVelocityY(-this.playerSpeed);
        }
        else if (down.isDown) {
            this.player.setVelocityY(this.playerSpeed);
        }
        else {
            this.player.setVelocityY(0);
        }
    }

    collidePlayerCoin(player, coin) {
        coin.disableBody(true, true);
    }

}
export default GameScene;
