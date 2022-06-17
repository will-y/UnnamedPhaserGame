import MovableEntity from "./MovableEntity";

class LivingEntity extends MovableEntity {
    constructor(scene, x, y, key, speed, initialDirection, health, collideObject) {
        super(scene, x, y, key, speed, initialDirection, collideObject);

        this.health = health;
    }

    canDamage() {
        return true;
    }

    damage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.kill();
        }
    }

    /**
     * Kill this living entity
     * Implementation up to subclasses (Player different from enemies)
     */
    kill() {

    }
}

export default LivingEntity;
