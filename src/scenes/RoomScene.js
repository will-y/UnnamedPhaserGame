import {Scene} from 'phaser';
import Entity from "../entity/Entity";
import Player from "../entity/Player";
import Pickup from "../entity/Pickup";

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

        this.player = new Player(this, 10, 10, 'main-character', this.cursors);

        // Create Game Objects
        const gameObjects = {};

        this.roomData.entities.forEach(entityGroup => {
            gameObjects[entityGroup.type] = this.physics.add.group();

            entityGroup.instances.forEach(instance => {
                gameObjects[entityGroup.type].add(new Pickup(this, instance.x, instance.y, entityGroup.type, this.player));
                // gameObjects[entityGroup.type].create(instance.x, instance.y, entityGroup.type);
            });
        });

        // Camera things
        this.cameras.main.startFollow(this.player);
    }

    update(time, delta) {
        this.player.updateEntity(time, delta);
    }
}

export default RoomScene;
