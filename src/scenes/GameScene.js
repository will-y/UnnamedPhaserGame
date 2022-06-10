import {Scene} from 'phaser';

class GameScene extends Scene {

    constructor() {
        super("scene-game");
    }

    create() {
        // Add, scale, and make up a speed for our creature
        this.player = this.physics.add.sprite(10, 10, 'main-character');
        this.player.setScale(0.5);
        this.playerSpeed = 300;
        // Create a helper object for our arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();
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

}
export default GameScene;
