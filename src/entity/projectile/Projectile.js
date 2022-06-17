import MovableEntity from "../MovableEntity";

class Projectile extends MovableEntity {
    constructor(scene, x, y, key, speed, direction, source, targets, damage) {
        super(scene, x, y, key, speed, direction);
        this.targets = targets;
        this.damageAmount = damage;
        this.source = source;
        scene.physics.add.overlap(this, targets, this.onHit);
        this.setVelocityBasedOffSource();
    }

    onHit(projectile, target) {
        projectile.destroy(true);

        if (target.canDamage()) {
            target.damage(this.damageAmount);
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

        console.log(velocity);

        this.speed = Math.sqrt(velocity[0]**2 + velocity[1]**2);
        this.direction = Math.atan2(-velocity[1], velocity[0]) * 180 / Math.PI;
        console.log(this.speed);
        this.velocityChanged = true;
    }

    updateEntity(time, delta) {
        super.updateEntity(time, delta);
    }

    destroy(fromScene) {
        this.scene.entities = this.scene.entities.filter(x => {
            return !(x.x === this.x && x.y === this.y);
        });
        super.destroy(fromScene);
    }
}

export default Projectile;
