import Projectile from "./Projectile";

class LaserProjectile extends Projectile {
    constructor(scene, x, y, key, speed, direction, source, targets, damage, life, spriteScale, bounce, heatSeek, split) {
        super(scene, x, y, key, speed, direction, source, targets, damage, life, spriteScale, bounce, heatSeek, split);

        scene.anims.create({
            key: "laser_move",
            frames: this.anims.generateFrameNumbers('laser', {start: 1, end: 2}),
            frameRate: 8,
            repeat: -1
        });
    }

    updateEntity(time, delta) {

        super.updateEntity(time, delta);
    }
}

export default LaserProjectile;
