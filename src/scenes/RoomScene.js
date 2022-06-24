import {Scene} from 'phaser';
import Player from "../entity/Player";
import Pickup from "../entity/Pickup";
import Rat from "../entity/enemy/Rat";
import Projectile from "../entity/projectile/Projectile";
import Boundary from "../physics/Boundary";

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

        // load in room background
        this.background = new Boundary(this, 0, 0, this.key, this.roomData.borderArray).setOrigin(0, 0).setInteractive();
        this.add.existing(this.background);
        this.input.on('gameobjectdown',this.onObjectClicked);
        this.makeBoundryArray = [];

        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.SPACE,
            inventory: Phaser.Input.Keyboard.KeyCodes.ESC,
            weapon1: Phaser.Input.Keyboard.KeyCodes.ONE,
            weapon2: Phaser.Input.Keyboard.KeyCodes.TWO,
            weapon3: Phaser.Input.Keyboard.KeyCodes.THREE,
            weapon4: Phaser.Input.Keyboard.KeyCodes.FOUR});

        this.enterKey = this.input.keyboard.addKeys({
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER
        });

        this.player = new Player(this, this.roomData.playerXStart, this.roomData.playerYStart, 'main-character', 200, this.cursors);

        // Create Game Objects
        this.gameObjects = {};
        this.entities = [];
        this.entities.push(this.player);

        this.roomData.entities.forEach(entityGroup => {
            this.gameObjects[entityGroup.type] = this.physics.add.group();

            entityGroup.instances.forEach(instance => {
                if (entityGroup.type === "pickup") {
                    this.gameObjects[entityGroup.type].add(new Pickup(this, instance.x, instance.y, entityGroup.key, this.player, instance.quantity));
                } else if (entityGroup.type === "enemy") {
                    const rat = new Rat(this, instance.x, instance.y, entityGroup.key, instance.speed, this.player, instance.trackRange, instance.updateSpeed, instance.health);
                    this.entities.push(rat);
                    this.gameObjects[entityGroup.type].add(rat);
                }
            });
        });

        // Camera things
        this.cameras.main.startFollow(this.player);
    }

    update(time, delta) {
        this.entities.forEach(entity => {
            entity.updateEntity(time, delta);
        });

        // update boundary
        this.background.updateBoundary(time, delta, this.entities);

        // Print array
        if (this.enterKey.enter.isDown) {
            this.makeBoundryArray.push(this.makeBoundryArray[0]);
            this.makeBoundryArray.push(this.makeBoundryArray[1]);
            console.log(this.makeBoundryArray);
        }
    }

    onObjectClicked(pointer, gameObject) {
        console.log(`${pointer.worldX}, ${pointer.worldY}`);
        gameObject.scene.add.ellipse(pointer.worldX, pointer.worldY, 5, 5, "0xFF0000");
        gameObject.scene.makeBoundryArray.push(pointer.worldX, pointer.worldY);
    }

    summonProjectile(projectile) {
        this.entities.push(projectile);
    }

    getTargets(friendly) {
        return friendly ? this.gameObjects["enemy"] : this.player;
    }
}

export default RoomScene;
