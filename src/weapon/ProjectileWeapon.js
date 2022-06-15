import Weapon from "./Weapon";

class ProjectileWeapon extends Weapon {
    constructor(scene, player, projectileVelocity) {
        super(scene, player);
        this.scene = scene;
        this.player = player;
    }

    fireWeapon() {

    }

    summonProjectile() {

    }
}

export default ProjectileWeapon;
