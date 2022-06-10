import {Scene} from 'phaser';

class GameScene extends Scene {

    constructor() {
        super("scene-game");
    }

    create() {
        // Add, scale, and make up a speed for our creature
        this.player = this.physics.add.sprite(10, 10, 'main-character');
        this.playerSpeed = 300;
        // Create a helper object for our arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // Coin things
        const coins = this.physics.add.group();
        const coin = coins.create(200, 200, "coin");
        coin.setBounce(1);

        this.physics.add.overlap(this.player, coins, this.collidePlayerCoin);
    }

    update() {
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
