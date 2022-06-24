import Projectile from "./Projectile";

class LaserProjectile extends Projectile {
    constructor(scene, x, y, key, speed, direction, source, targets, damage, life, spriteScale, bounce, heatSeek, split) {
        super(scene, x, y, key, speed, direction, source, targets, damage, life, spriteScale, bounce, heatSeek, split);
    }
}
