import MovableEntity from "./MovableEntity";

class Player extends MovableEntity {
    constructor(scene, x, y, key, speed, cursors, enemies, startingWeapon) {
        super(scene, x, y, key, speed, 0);
        this.cursors = cursors;
        this.weapon = startingWeapon;
        this.enemies = enemies;
        this.setUpPlayerAnimations();

        // Temp weapon stuff
        this.attackCooldown = 20;
        this.attackCooldownCounter = this.attackCooldown;
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
        const {left, right, up, down, attack} = this.cursors;

        // Attacking
        if (attack.isDown && this.attackCooldownCounter >= this.attackCooldown) {
            this.attackCooldownCounter = 0;
            this.scene.summonProjectile(this.x, this.y, "projectile-basic", 100, 0, true);
        }

        if (this.attackCooldownCounter < this.attackCooldown) {
            this.attackCooldownCounter++;
        }

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
