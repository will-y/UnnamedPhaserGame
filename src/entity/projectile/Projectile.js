import MovableEntity from "../MovableEntity";
import {arrayMin, distanceFromLineSegment} from "../../util/MathUtil";
import {calculateBounceVelocity} from "../../util/PhysicsUtil";

class Projectile extends MovableEntity {
    constructor(scene, x, y, key, speed, direction, source, targets, damage, life, spriteScale, bounce=false, heatSeek=false, split=false) {
        super(scene, x, y, key, speed, direction);
        this.source = source;
        this.targets = targets;
        this.damageAmount = damage;
        this.life = life;
        this.spriteScale = spriteScale;
        this.bounce = bounce;
        this.heatSeek = heatSeek;
        this.split = split;

        this.setScale(this.spriteScale, this.spriteScale);
        this.angle = -this.direction;

        scene.physics.add.overlap(this, targets, this.onHit);
        if (this.source) {
            this.setVelocityBasedOffSource();
        }
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

        // Heat Seeking things
        if (this.heatSeek && this.targets && this.targets.children.entries.length > 0) {
            const closestEnemy = this.targets.children.entries[arrayMin(this.targets.children.entries.map(target => target.distanceTo(this)), true)[1]];

            this.direction = (Math.atan2(this.y - closestEnemy.y, closestEnemy.x - this.x) * 180 / Math.PI + 360) % 360;
            this.speed = this.maxSpeed;
            this.velocityChanged = true;
        }

        if (this.velocityChanged) {
            this.angle = -this.direction;
        }

        super.updateEntity(time, delta);
    }

    onBoundaryCollide(blocked, boundary) {
        if (this.bounce) {
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
        } else {
            this.destroy(true);
        }
        return true;
    }

    destroy(fromScene) {
        if (this.split) {
            // TODO: this is going to be a problem if friendly ever matters
            this.scene.summonProjectile(this.x, this.y, this.key, this.speed, 0, null, true, this.damageAmount / 2, this.scale / 2, this.bounce, this.heatSeek, false);
            this.scene.summonProjectile(this.x, this.y, this.key, this.speed, 90, null, true, this.damageAmount / 2, this.scale / 2, this.bounce, this.heatSeek, false);
            this.scene.summonProjectile(this.x, this.y, this.key, this.speed, 180, null, true, this.damageAmount / 2, this.scale / 2, this.bounce, this.heatSeek, false);
            this.scene.summonProjectile(this.x, this.y, this.key, this.speed, 270, null, true, this.damageAmount / 2, this.scale / 2, this.bounce, this.heatSeek, false);
        }
        super.destroy(fromScene);
    }
}

export default Projectile;
