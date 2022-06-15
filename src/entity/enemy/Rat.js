import Enemy from "./Enemy";

class Rat extends Enemy {
    constructor(scene, x, y, key, speed, player, frameWidth, frameHeight) {
        super(scene, x, y, key, speed, player);

        this.hitboxWidth = this.body.width;
        this.hitboxHeight = this.body.height;
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
            this.body.setSize(this.hitboxWidth, this.hitboxHeight);
        } else if (this.direction >= 80 && this.direction <= 100) {
            // UP
            this.anims.play("rat_up", true);
            this.flipX = false;
            this.angle = 90;
            this.body.setSize();
            this.body.setSize(this.hitboxHeight, this.hitboxWidth);
        } else if (this.direction > 100 && this.direction < 260) {
            // LEFT
            this.anims.play("rat_right", true);
            this.flipX = true;
            this.angle = 0;
            this.body.setSize(this.hitboxWidth, this.hitboxHeight);
        } else if (this.direction >= 260 && this.direction <= 280) {
            // DOWN
            this.anims.play("rat_up", true);
            this.flipX = false;
            this.angle = 270;
            this.body.setSize(this.hitboxHeight, this.hitboxWidth);
        }
    }

    updateEntity(time, delta) {
        super.updateEntity(time, delta);
    }
}

export default Rat;
