import LivingEntity from "./LivingEntity";
import Inventory from "../item/Inventory";
import ItemRegistry from "../item/ItemRegistry";

class Player extends LivingEntity {
    constructor(scene, x, y, key, speed, cursors, enemies) {
        super(scene, x, y, key, speed, 0, 100);
        this.cursors = cursors;
        // Don't remember why I thought I needed this?
        this.enemies = enemies;
        this.inventory = new Inventory();
        this.activeWeapon = 0;
        this.setUpPlayerAnimations();


        this.inventory.addItem(ItemRegistry.getItem("laser_gun"), 1);
    }

    setUpPlayerAnimations() {
        this.scene.anims.create({
            key: "player_down",
            frames: this.anims.generateFrameNumbers('main-character', {start: 0, end: 5}),
            frameRate: 16,
            repeat: -1
        });

        this.scene.anims.create({
            key: "player_up",
            frames: this.anims.generateFrameNumbers('main-character', {start: 6, end: 11}),
            frameRate: 16,
            repeat: -1
        });

        this.scene.anims.create({
            key: "player_right",
            frames: this.anims.generateFrameNumbers('main-character', {start: 12, end: 15}),
            frameRate: 8,
            repeat: -1
        });
    }

    playMoveAnimation() {
        if (this.direction < 80 || this.direction > 280) {
            // Right
            this.anims.play("player_right", true);
            this.flipX = false;
        } else if (this.direction >= 80 && this.direction <= 100) {
            // UP
            this.anims.play("player_up", true);
            this.flipX = false;
        } else if (this.direction > 100 && this.direction < 260) {
            // LEFT
            this.anims.play("player_right", true);
            this.flipX = true;
        } else if (this.direction >= 260 && this.direction <= 280) {
            // DOWN
            this.anims.play("player_down", true);
            this.flipX = false;
        }
    }

    updateEntity(time, delta) {
        const {left, right, up, down, attack, inventory, weapon1, weapon2, weapon3, weapon4} = this.cursors;

        const weapon = this.inventory.getWeapon(this.activeWeapon);

        if (weapon) {
            weapon.useItem(this, attack);
        }

        // Weapon Changing
        if (weapon1.isDown) {
            this.activeWeapon = 0;
            console.log("Weapon changed to 1");
        } else if (weapon2.isDown) {
            this.activeWeapon = 1;
            console.log("Weapon changed to 2");
        } else if (weapon3.isDown) {
            this.activeWeapon = 2;
            console.log("Weapon changed to 3");
        } else if (weapon4.isDown) {
            this.activeWeapon = 3;
            console.log("Weapon changed to 4");
        }

        // Inventory
        if (inventory.isDown) {
            console.log(this.inventory);
        }

        // Movement
        if (up.isDown && right.isDown) {
            // Up Right
            this.direction = 45;
            this.speed = this.maxSpeed;
        } else if (up.isDown && left.isDown) {
            // Up Left
            this.direction = 135;
            this.speed = this.maxSpeed;
        } else if (down.isDown && right.isDown) {
            // Down right
            this.direction = 315;
            this.speed = this.maxSpeed;
        } else if (down.isDown && left.isDown) {
            // Down left
            this.direction = 225;
            this.speed = this.maxSpeed;
        } else if (up.isDown) {
            // Up
            this.direction = 90;
            this.speed = this.maxSpeed;
        } else if (down.isDown) {
            // Down
            this.direction = 270;
            this.speed = this.maxSpeed;
        } else if (right.isDown) {
            // Right
            this.direction = 0;
            this.speed = this.maxSpeed;
        } else if (left.isDown) {
            // Left
            this.direction = 180;
            this.speed = this.maxSpeed;
        } else {
            this.speed = 0;
            this.anims.stop();
        }

        // Just for player always have this
        this.velocityChanged = true;
        super.updateEntity(time, delta);
    }
}

export default Player;
