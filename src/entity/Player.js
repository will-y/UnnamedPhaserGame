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
            key: "forward",
            frames: this.anims.generateFrameNumbers('main-character', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: "backward",
            frames: this.anims.generateFrameNumbers('main-character', {start: 6, end: 10}),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: "still",
            frames: [{key: 'main-character', frame: 0}],
            frameRate: 20
        });
    }

    updateEntity(time, delta) {
        const {left, right, up, down} = this.cursors;
        if (left.isDown) {
            this.setVelocityX(-this.speed);
            // this.player.anims.play('still');
        } else if (right.isDown) {
            this.setVelocityX(this.speed);
            // this.player.anims.play('still');
        } else {
            this.setVelocityX(0);
        }

        if (up.isDown) {
            this.setVelocityY(-this.speed);
            this.anims.play('backward', true);
        } else if (down.isDown) {
            this.setVelocityY(this.speed);
            this.anims.play('forward', true);
        } else {
            this.setVelocityY(0);
            this.anims.play('still');
        }
    }
}

export default Player;
