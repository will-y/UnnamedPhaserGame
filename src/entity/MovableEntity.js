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
            this.setVelocityFromDirection();
            this.velocityChanged = false;
        }
    }

    setVelocityFromDirection() {
        const dx = Math.cos(this.direction * Math.PI / 180.0) * this.speed;
        const dy = -Math.sin(this.direction * Math.PI / 180.0) * this.speed;

        this.setVelocity(dx, dy);
    }
}

export default MovableEntity;
