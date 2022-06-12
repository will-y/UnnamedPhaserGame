import {Scene} from 'phaser';
import Entity from "../entity/Entity";
import Player from "../entity/Player";

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

        this.cursors = this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});

        // Create Coins and things
        // Going to need a player start position for rooms
        // TODO: Add these to player class
        this.player = new Player(this, 10, 10, 'main-character', this.cursors);



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
        this.player.updateEntity(time, delta);
    }

    // TODO: need to figure out how interaction with player will work
    // probably need a class for pickups / enemies and then have a type to create classes and have methods there for
    // handling interaction with player
    collidePlayerCoin(player, coin) {
        coin.disableBody(true, true);
    }
}

export default RoomScene;
