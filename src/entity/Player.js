import Entity from "./Entity";

class Player extends Entity {
    constructor(scene, x, y, key, cursors) {
        super(scene, x, y, key);

        this.cursors = cursors
        scene.physics.add.existing(this);
        this.speed = 300;
        this.setUpPlayerAnimations();
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
            key: "player_still",
            frames: [{key: 'main-character', frame: 0}],
            frameRate: 20
        });

        this.scene.anims.create({
            key: "player_right",
            frames: this.anims.generateFrameNumbers('main-character', {start: 12, end: 15}),
            frameRate: 8,
            repeat: -1
        });
    }

    updateEntity(time, delta) {
        const {left, right, up, down} = this.cursors;

        const diagSpeed = Math.sqrt((this.speed**2) / 2);

        if (up.isDown && right.isDown) {
            // Up Right
            this.setVelocity(diagSpeed, -diagSpeed);
            this.anims.play('player_right', true);
            this.flipX = false;
        } else if (up.isDown && left.isDown) {
            // Up Left
            this.setVelocity(-diagSpeed, -diagSpeed);
            this.anims.play('player_right', true);
            this.flipX = true;
        } else if (down.isDown && right.isDown) {
            // Down right
            this.setVelocity(diagSpeed, diagSpeed);
            this.anims.play('player_right', true);
            this.flipX = false;
        } else if (down.isDown && left.isDown) {
            // Down left
            this.setVelocity(-diagSpeed, diagSpeed);
            this.anims.play('player_right', true);
            this.flipX = true;
        } else if (up.isDown) {
            // Up
            this.setVelocity(0, -this.speed);
            this.anims.play('player_up', true);
            this.flipX = false;
        } else if (down.isDown) {
            // Down
            this.setVelocity(0, this.speed);
            this.anims.play('player_down', true);
            this.flipX = false;
        } else if (right.isDown) {
            // Right
            this.setVelocity(this.speed, 0);
            this.anims.play('player_right', true);
            this.flipX = false;
        } else if (left.isDown) {
            // Left
            this.setVelocity(-this.speed, 0);
            this.anims.play('player_right', true);
            this.flipX = true;
        } else {
            // Nothing down TODO: Implement Facing so can play correct animation here
            this.setVelocity(0, 0);
            this.anims.stop();
        }
    }
}

export default Player;
