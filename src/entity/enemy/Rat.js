import Enemy from "./Enemy";

class Rat extends Enemy {
    constructor(scene, x, y, key, speed, player) {
        super(scene, x, y, key, speed, player);

        this.maxSpeed = speed;

        this.cursors = scene.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});
    }

    setUpEnemyAnimation() {
        this.scene.anims.create({
            key: "rat_right",
            frames: this.anims.generateFrameNumbers('rat', {start: 0, end: 2}),
            frameRate: 16,
            repeat: -1
        });

        this.scene.anims.create({
            key: "rat_up",
            frames: this.anims.generateFrameNumbers('rat', {start: 11, end: 14}),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: "rat_attack",
            frames: this.anims.generateFrameNames('rat', {start: 3, end: 10}),
            frameRate: 32
        });
    }

    playMoveAnimation() {
        if (this.direction < 80 || this.direction > 280) {
            // Right
            this.anims.play("rat_right", true);
            this.flipX = false;
            this.angle = 0;
        } else if (this.direction >= 80 && this.direction <= 100) {
            // UP
            this.anims.play("rat_up", true);
            this.flipX = false;
            this.angle = 90;
        } else if (this.direction > 100 && this.direction < 260) {
            // LEFT
            this.anims.play("rat_right", true);
            this.flipX = true;
            this.angle = 0;
        } else if (this.direction >= 260 && this.direction <= 280) {
            // DOWN
            this.anims.play("rat_up", true);
            this.flipX = false;
            this.angle = 270;
        }
    }

    updateEntity(time, delta) {
        const {left, right, up, down} = this.cursors;

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

export default Rat;
