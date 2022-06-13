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
            frames: this.anims.generateFrameNumbers('main-character', {start: 6, end: 10}),
            frameRate: 16,
            repeat: -1
        });

        this.scene.anims.create({
            key: "player_still",
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
            this.anims.play('player_up', true);
        } else if (down.isDown) {
            this.setVelocityY(this.speed);
            this.anims.play('player_down', true);
        } else {
            this.setVelocityY(0);
            this.anims.play('player_still');
        }
    }
}

export default Player;
