import Entity from "./Entity";

class MovableEntity extends Entity {
    constructor(scene, x, y, key, speed, initialDirection, collideObject) {
        super(scene, x, y, key, collideObject);

        this.speed = speed;
        this.maxSpeed = speed;
        this.direction = initialDirection;
        this.velocityChanged = true;

        scene.physics.add.existing(this);
    }

    /**
     * Plays the entity's current moving animation based on direction or whatever
     * Called when velocity changes
     */
    playMoveAnimation() {

    }

    updateEntity(time, delta) {
        if (this.velocityChanged) {
            this.playMoveAnimation();
            const velocity = this.getVelocityFromDirection();
            this.setVelocity(velocity[0], velocity[1]);
            this.velocityChanged = false;
        }
    }

    getVelocityFromDirection() {
        const dx = Math.cos(this.direction * Math.PI / 180.0) * this.speed;
        const dy = -Math.sin(this.direction * Math.PI / 180.0) * this.speed;

        return [dx, dy];
    }

    canDamage() {
        return true;
    }
}

export default MovableEntity;
