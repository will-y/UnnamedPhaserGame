import MovableEntity from "../MovableEntity";

class Projectile extends MovableEntity {
    constructor(scene, x, y, key, speed, direction, targets) {
        super(scene, x, y, key, speed, direction);
        this.targets = targets;

        scene.physics.add.collider(this, targets);
    }

    onHit(projectile, target) {
        console.log("HIT " + target.key);
    }

    updateEntity(time, delta) {

        super.updateEntity(time, delta);
    }

    destroy(fromScene) {
        this.scene.entities.remove(this);
        super.destroy(fromScene);
    }
}

export default Projectile;
