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

        // player animations
        this.anims.create({
            key: "forward",
            frames: this.anims.generateFrameNumbers('main-character', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "backward",
            frames: this.anims.generateFrameNumbers('main-character', {start: 6, end: 10}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "still",
            frames: [{key: 'main-character', frame: 0}],
            frameRate: 20
        });

        // Create a helper object for our arrow keys
        // this.cursors = this.input.keyboard.createCursorKeys();

        this.cursors = this.input.keyboard.addKeys(
            {
                up:Phaser.Input.Keyboard.KeyCodes.W,
                down:Phaser.Input.Keyboard.KeyCodes.S,
                left:Phaser.Input.Keyboard.KeyCodes.A,
                right:Phaser.Input.Keyboard.KeyCodes.D});
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
            // this.player.anims.play('still');
        } else if (right.isDown) {
            this.player.setVelocityX(this.playerSpeed);
            // this.player.anims.play('still');
        } else {
            this.player.setVelocityX(0);
        }

        if (up.isDown) {
            this.player.setVelocityY(-this.playerSpeed);
            this.player.anims.play('backward', true);
        } else if (down.isDown) {
            this.player.setVelocityY(this.playerSpeed);
            this.player.anims.play('forward', true);
        } else {
            this.player.setVelocityY(0);
            this.player.anims.play('still');
        }
    }

    collidePlayerCoin(player, coin) {
        coin.disableBody(true, true);
    }

}
export default GameScene;
