import MovableEntity from "../MovableEntity";

class Projectile extends MovableEntity {
    constructor(scene, x, y, key, speed, direction, source, targets, damage, life) {
        super(scene, x, y, key, speed, direction);
        this.damageAmount = damage;
        this.source = source;
        this.life = life;
        scene.physics.add.overlap(this, targets, this.onHit);
        this.setVelocityBasedOffSource();
    }

    onHit(projectile, target) {
        // Needed if collides with two enemies in the same frame
        if (projectile.scene) {
            if (target.canDamage()) {
                target.damage(projectile.damageAmount);
            }

            projectile.destroy(true);
        }
    }

    /**
     * Takes in initial velocity and then adds the source's velocity to it
     */
    setVelocityBasedOffSource() {
        const velocity = this.getVelocityFromDirection();
        const sourceVelocity = this.source.body.velocity;
        velocity[0] = velocity[0] + sourceVelocity.x;
        velocity[1] = velocity[1] + sourceVelocity.y;

        this.speed = Math.sqrt(velocity[0]**2 + velocity[1]**2);
        this.direction = Math.atan2(-velocity[1], velocity[0]) * 180 / Math.PI;
        this.velocityChanged = true;
    }

    updateEntity(time, delta) {
        this.life--;
        if (this.life <= 0) {
            this.destroy(true);
        }
        super.updateEntity(time, delta);
    }

    onBoundaryCollide() {
        this.destroy(true);
        return true;
    }
}

export default Projectile;
