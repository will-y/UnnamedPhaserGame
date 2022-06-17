import MovableEntity from "./MovableEntity";

class LivingEntity extends MovableEntity {
    constructor(scene, x, y, key, speed, initialDirection, collideObject) {
        super(scene, x, y, key, speed, initialDirection, collideObject);
    }
}

export default LivingEntity;
