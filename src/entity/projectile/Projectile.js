import MovableEntity from "../MovableEntity";

class Projectile extends MovableEntity {
    constructor(scene, x, y, key, speed, direction, targets) {
        super(scene, x, y, key, speed, direction);
        this.targets = targets;
    }

    onHit(projectile, target) {

    }

    updateEntity(time, delta) {

        super.updateEntity(time, delta);
    }
}

export default Projectile;
