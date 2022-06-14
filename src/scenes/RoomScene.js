import {Scene} from 'phaser';
import Player from "../entity/Player";
import Pickup from "../entity/Pickup";
import Rat from "../entity/enemy/Rat";

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
        this.add.image(0, 0, this.key).setOrigin(0, 0).setInteractive();
        this.input.on('gameobjectdown',this.onObjectClicked);
        this.makeBoundryArray = [];

        this.cursors = this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});

        this.enterKey = this.input.keyboard.addKeys({
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER
        });

        this.player = new Player(this, this.roomData.playerXStart, this.roomData.playerYStart, 'main-character', this.cursors);

        // Create Game Objects
        const gameObjects = {};
        this.entities = []
        this.entities.push(this.player);

        this.roomData.entities.forEach(entityGroup => {
            gameObjects[entityGroup.key] = this.physics.add.group();

            entityGroup.instances.forEach(instance => {
                if (entityGroup.type === "pickup") {
                    gameObjects[entityGroup.key].add(new Pickup(this, instance.x, instance.y, entityGroup.key, this.player));
                } else if (entityGroup.type === "enemy") {
                    const rat = new Rat(this, instance.x, instance.y, entityGroup.key, instance.speed);
                    this.entities.push(rat);
                    gameObjects[entityGroup.key].add(rat);
                }
            });
        });

        // Camera things
        this.cameras.main.startFollow(this.player);

        // Walls
        this.debug = this.add.graphics({ lineStyle: { color: 0xffff00 } });

        this.boundry = new Phaser.Geom.Polygon([80, 109, 254, 127, 425, 180, 560, 250, 674, 336, 550, 513, 325, 410, 145, 283, 100, 195, 80, 109]);

        // Will represent the player body
        this.playerRect = new Phaser.Geom.Rectangle();

        // Will hold a per-step velocity (distance)
        this.tempVelocity = new Phaser.Math.Vector2();
    }

    update(time, delta) {
        this.entities.forEach(entity => {
            entity.updateEntity(time, delta);
        });

        const body = this.player.body;

        // Move the player rectangle ahead by one step of the provisional velocity
        this.projectRect(this.playerRect, body, 1 / this.physics.world.fps);

        // Check if the player rectangle is within the polygon and "block" the body on any corresponding axes
        this.setBlocked(body.blocked, this.playerRect, this.boundry);

        // Limit the provisional velocity based on the blocked axes
        this.clampVelocity(body.velocity, body.blocked);

        // Draw the polygons
        if (this.physics.world.drawDebug) {
            this.debug
                .clear()
                .strokePoints(this.boundry.points)
                .strokeRectShape(this.playerRect);
        }

        // Print array
        if (this.enterKey.enter.isDown) {
            this.makeBoundryArray.push(this.makeBoundryArray[0]);
            this.makeBoundryArray.push(this.makeBoundryArray[1]);
            console.log(this.makeBoundryArray);
        }
    }

    projectRect(rect, body, time) {
        this.tempVelocity.copy(body.velocity).scale(time);
        Phaser.Geom.Rectangle.CopyFrom(body, rect);
        Phaser.Geom.Rectangle.OffsetPoint(rect, this.tempVelocity);
    }

    clampVelocity(velocity, blocked) {
        if (blocked.left) velocity.x = Phaser.Math.Clamp(velocity.x, 0, Infinity);
        if (blocked.right) velocity.x = Phaser.Math.Clamp(velocity.x, -Infinity, 0);
        if (blocked.up) velocity.y = Phaser.Math.Clamp(velocity.y, 0, Infinity);
        if (blocked.down) velocity.y = Phaser.Math.Clamp(velocity.y, -Infinity, 0);
    }

    setBlocked(blocked, rect, bounds) {
        if (!bounds.contains(rect.left, rect.top)) {
            blocked.left = true;
            blocked.up = true;
        }
        if (!bounds.contains(rect.left, rect.bottom)) {
            blocked.left = true;
            blocked.down = true;
        }
        if (!bounds.contains(rect.right, rect.top)) {
            blocked.right = true;
            blocked.up = true;
        }
        if (!bounds.contains(rect.right, rect.bottom)) {
            blocked.right = true;
            blocked.down = true;
        }

        blocked.none = !blocked.left && !blocked.right && !blocked.up && !blocked.down;
    }

    onObjectClicked(pointer, gameObject) {
        console.log(`${pointer.worldX}, ${pointer.worldY}`);
        gameObject.scene.add.ellipse(pointer.worldX, pointer.worldY, 5, 5, "0xFF0000");
        gameObject.scene.makeBoundryArray.push(pointer.worldX, pointer.worldY);
    }
}

export default RoomScene;
