import MovableEntity from "../MovableEntity";

class Projectile extends MovableEntity {
    constructor(scene, x, y, key, speed, direction, targets) {
        super(scene, x, y, key, speed, direction);
        this.targets = targets;
        scene.physics.add.overlap(this, targets, this.onHit);
    }

    onHit(projectile, target) {
        console.log("HIT " + target.key + " With " + projectile.key);
        projectile.destroy(true);
    }

    updateEntity(time, delta) {

        super.updateEntity(time, delta);
    }

    destroy(fromScene) {
        // console.log(this.scene.entities);
        this.scene.entities = this.scene.entities.filter(x => {
            const res = !(x.x === this.x && x.y === this.y);
            // console.log(x.key + ":");
            // console.log(x.x, this.x, x.y, this.y, res);
            // if (res) {
            //     console.log(x);
            // }
            return res;
        });
        // console.log(this.scene.entities);
        super.destroy(fromScene);
    }
}

export default Projectile;
