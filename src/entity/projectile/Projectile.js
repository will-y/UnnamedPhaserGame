import MovableEntity from "../MovableEntity";
import {arrayMin, distanceFromLineSegment} from "../../util/MathUtil";
import {calculateBounceVelocity} from "../../util/PhysicsUtil";

class Projectile extends MovableEntity {
    constructor(scene, x, y, key, speed, direction, source, targets, damage, life, bounce) {
        super(scene, x, y, key, speed, direction);
        this.damageAmount = damage;
        this.source = source;
        this.life = life;
        this.bounce = bounce;
        scene.physics.add.overlap(this, targets, this.onHit);
        this.setVelocityBasedOffSource();
        this.bounceCooldown = 0;
    }

    onHit(projectile, target) {
        // Needed if collides with two enemies in the same frame (maybe)
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

    onBoundaryCollide(blocked, boundary) {
        if (this.bounce) {
            if (this.bounceCooldown === 0) {
                const points = boundary.points;
                // lines that make up polygon
                const lines = [];

                for (let i = 0; i < points.length - 1; i++) {
                    lines.push([points[i], points[i+1]]);
                }

                const closestLine = lines[arrayMin(lines.map(line => {
                    return distanceFromLineSegment(line[0], line[1], this);
                }), true)[1]];

                const newSpeed = calculateBounceVelocity(closestLine, this.body.velocity);

                this.setVelocity(newSpeed[0], newSpeed[1]);
                this.bounceCooldown = 3;
            } else {
                this.bounceCooldown--;
            }
        } else {
            this.destroy(true);
        }
        return true;
    }
}

export default Projectile;
