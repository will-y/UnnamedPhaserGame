import {Scene} from 'phaser';
import Entity from "../entity/Entity";

class RoomScene extends Scene {
    constructor(key, roomData) {
        super(key);
        this.key = key;
        this.roomData = roomData;
    }

    preload() {
        // should already have everything loaded
    }

    create() {
        console.log(`Room Scene Created [${this.key}]`);

        // Create Coins and things
        // Going to need a player start position for rooms
        // TODO: Add these to player class
        this.player = new Entity(this, 10, 10, 'main-character');
        this.player = this.physics.add.existing(this.player);
        this.playerSpeed = 300;
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

        this.cursors = this.input.keyboard.addKeys(
            {
                up:Phaser.Input.Keyboard.KeyCodes.W,
                down:Phaser.Input.Keyboard.KeyCodes.S,
                left:Phaser.Input.Keyboard.KeyCodes.A,
                right:Phaser.Input.Keyboard.KeyCodes.D});

        // Create Game Objects
        const gameObjects = {};

        this.roomData.entities.forEach(entityGroup => {
            gameObjects[entityGroup.type] = this.physics.add.group();

            entityGroup.instances.forEach(instance => {
                gameObjects[entityGroup.type].create(instance.x, instance.y, entityGroup.type);
            });
        });

        // Camera things
        this.cameras.main.startFollow(this.player);
    }

    update(time, delta) {
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

    // TODO: need to figure out how interaction with player will work
    // probably need a class for pickups / enemies and then have a type to create classes and have methods there for
    // handling interaction with player
    collidePlayerCoin(player, coin) {
        coin.disableBody(true, true);
    }
}

export default RoomScene;
